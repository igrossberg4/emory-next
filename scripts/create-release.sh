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

# Merge current branch with master.
$git checkout $currentBranch
$git merge --ff-only $masterBranch

# Fast forward dev and stage branches with master, if possible.
DEV_MERGE_FAILED=0
STG_MERGE_FAILED=0
if [ $currentBranch != $devBranch ]; then
  $git checkout $devBranch
  $git pull origin $devBranch --rebase
  $git merge --ff-only $masterBranch
  if [ $? -ne 0 ]; then
    DEV_MERGE_FAILED=1
    echo "Unable to cleanly fast-forward merge $devBranch"
  fi
elif [ $currentBranch != $stgBranch ]; then
  $git checkout $stgBranch
  $git merge --ff-only $masterBranch
  if [ $? -ne 0 ]; then
    STG_MERGE_FAILED=1
    echo "Unable to cleanly fast-forward merge $stgBranch"
  fi
fi

# Remove release branch.
$git branch -d $releaseBranch

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
echo "  git checkout $currentBranch"
echo "  git push origin $currentBranch"
if [ $currentBranch != $devBranch ]; then
echo "  git checkout $devBranch"
if [ $DEV_MERGE_FAILED -eq 1 ]; then
echo "  git merge $masterBranch"
fi
echo "  git push origin $devBranch"
fi
if [ $currentBranch != $stgBranch ]; then
echo "  git checkout $stgBranch"
if [ $STG_MERGE_FAILED -eq 1 ]; then
echo "  git merge $masterBranch"
fi
echo "  git push origin $stgBranch"
fi
