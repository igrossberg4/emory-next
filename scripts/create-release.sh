#!/bin/bash
set -e

cancel() {
  echo "Canceling. No release was created."
  exit 0;
}

if [[ -n $(git status -s) ]]; then
  echo "There are uncommitted changes in your local working tree. Please commit or stash them first."
  cancel
fi

# Establish branch and tag name variables
currentBranch=$(git symbolic-ref HEAD | sed -e 's,.*/\(.*\),\1,')
lastRelease=$(git describe --tags --abbrev=0)
## lastRelease=$(node -p "require('./package.json').version")
devBranch=dev
masterBranch=main

if [ "$currentBranch" != "$devBranch" ]; then
  echo "WARNING: You're not currently on the ${devBranch} branch."
  echo "Proceed to create release from branch '${currentBranch}'? (Y/n)"
  echo "  > (Not recommended!)"
  echo "  > (Note: '${currentBranch}' will be merged into '${masterBranch}' for release)"
  read -p "  > " proceed
  if [ "$proceed" == "n" ]; then
    cancel
  fi
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
$git merge --no-ff $releaseBranch

# Create tag for new version from master.
$git tag $versionLabel

# Merge release branch with the new version number back into develop.
$git checkout $devBranch
$git merge --ff $releaseBranch

# Remove release branch.
$git branch -d $releaseBranch

# Switch back to master branch to review and push the release.
$git checkout $masterBranch

set +x

echo ""
echo ""
echo "Release '$versionLabel' was created. You're now on the '$masterBranch'."
echo "Please review the changes and execute the following commands to trigger CI workflows:"
echo ""
echo "  git push origin $masterBranch"
echo "  git push origin $versionLabel"
echo "  git checkout $devBranch"
echo "  git merge $masterBranch --ff"
echo "  git push origin $devBranch"
