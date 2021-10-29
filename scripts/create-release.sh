#!/bin/bash
set -e

cancel() {
  echo "Canceling. No release was created."
  exit 0;
}

if [[ -n $(git status -suno) ]]; then
  echo "There are uncommitted changes in your local working tree. Please commit or stash them first."
  echo "  > git status"
  git status -suno
  cancel
fi

# Establish branch and tag name variables
currentBranch=$(git symbolic-ref HEAD | sed -e 's,.*/\(.*\),\1,')
lastRelease=$(git describe --tags $(git rev-list --tags --max-count=1))
## lastRelease=$(node -p "require('./package.json').version")
devBranch=dev
stgBranch=stage
masterBranch=main

echo "Branch '${currentBranch}' will be merged into '${masterBranch}' for release."

if [ "$currentBranch" == "$stgBranch" ]; then
  echo "Proceed to create release from branch '${currentBranch}'? (Y/n)"
  read -p "  > " proceed
  if [ "$proceed" == "n" ]; then
    cancel
  fi
elif [ "$currentBranch" != "$devBranch" ]; then
  echo "WARNING: You're not currently on the ${devBranch} or ${stgBranch} branch."
  echo "Proceed to create release from branch '${currentBranch}'? (Y/n)"
  echo "  > (Not recommended!)"
  echo "  > "
  read -p "  > " proceed
  if [ "$proceed" == "n" ]; then
    cancel
  fi
fi

echo ""
echo "  > Comparing local working tree with remote..."
behind=0
git remote update && git status -sbuno | grep -q 'behind' && behind=1
if [ $behind = 1 ]; then
  echo "WARNING: Your local working tree is behind the remote."
  echo "  > git status"
  git status -sbuno
  echo "  > Please git pull and review changes before creating a release."
  cancel
else
  echo "  > You're clear for a release!"
  echo ""
fi

if [ $# -eq 0 ]; then
  echo "Please specify a release number in X.Y.Z format:"
  echo "  > (The previous release was ${lastRelease})"
  read -p "  > " versionLabel
else
  versionLabel=$1
fi
releaseBranch=release-$versionLabel

echo "Create release ${versionLabel}? (Y/n) "
read -p "  > " proceed
if [[ "$proceed" =~ "^[Nn]" ]]; then
  cancel
fi
set -x

# Wrapper for git command to ensure hooks do not interfere.
git="git -c core.hooksPath=/dev/null"

# Create the release branch from the current HEAD.
$git checkout -b $releaseBranch $currentBranch

# Update version number in npm package.json
npm version $versionLabel --no-git-tag-version

# Commit version number increment.
$git commit -am "Bump to version $versionLabel"

# Merge release branch with the new version number into master.
$git checkout $masterBranch
$git pull origin $masterBranch --rebase
$git merge --no-ff $releaseBranch

# Create tag for new version from master.
$git tag $versionLabel

# Merge release branch with the new version number back into current branch.
if [ $currentBranch == $devBranch ]; then
  $git checkout $currentBranch
  $git merge --ff-only $releaseBranch
  [ $? -ne 0 ] && FF_MERGE_FAILED=1 || FF_MERGE_FAILED=0
elif [ $currentBranch == $stgBranch ]; then
  $git checkout $currentBranch
  $git merge --ff-only $releaseBranch
  [ $? -ne 0 ] && FF_MERGE_FAILED=1 || FF_MERGE_FAILED=0
  $git checkout $devBranch
  $git pull origin $devBranch --rebase
  $git merge --ff-only $releaseBranch 2>/dev/null
  [ $? -ne 0 ] && FF_MERGE_FAILED=1 || FF_MERGE_FAILED=0
fi

# Remove release branch.
if [ $FF_MERGE_FAILED -eq 1 ]; then
  echo "Unable to cleanly fast-forward merge $releaseBranch"
else
  $git branch -d $releaseBranch

  # Try to fast-forward merge branches with master.
  $git checkout $currentBranch
  $git pull origin $currentBranch --rebase
  $git merge --ff-only $masterBranch
  $git checkout $devBranch
  $git pull origin $devBranch --rebase
  $git merge --ff-only $masterBranch
  $git checkout $stgBranch
  $git pull origin $stgBranch --rebase
  $git merge --ff-only $masterBranch
fi

# Switch back to master branch to review and push the release.
$git checkout $masterBranch

set +x

echo ""
echo ""
echo "Release '$versionLabel' was created. You're now on the '$masterBranch' branch."
echo "Please review the changes and execute the following commands to trigger CI workflows:"
echo ""
echo "  git push origin $masterBranch"
echo "  git push origin $versionLabel"
if [ $currentBranch == $devBranch ]; then
echo "  git checkout $devBranch"
echo "  git merge $masterBranch --ff"
echo "  git push origin $devBranch"
else
echo "  git checkout $currentBranch"
echo "  git push origin $currentBranch"
echo "  git checkout $devBranch"
echo "  git merge $masterBranch --ff"
echo "  git push origin $devBranch"
fi
