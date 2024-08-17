# Step by Step GitHub Workflow

## 1a. Clone the repo

If this is your first time working with this repo, navigate to/create the directory you want to work in, then clone the repo:

`git clone <link to repo>`

You will need to connect your local `dev` branch to the origin `dev` by doing the following:

`git fetch`

`git checkout -b dev --track origin/dev`

## OR

## 1b. Update your directory

If you have already been working on the repo locally, you may want to ensure you are working on the most updated version.

First, ensure you are on the `dev` branch:

`git status` tells you which branch you are working in

`git checkout dev` to switch to `dev` branch

`git pull` this will update your directory to the latest version on the `dev` branch

## 2. Create and start working on a feature branch

`git checkout -b <branch name>`

Branch naming convention follows: name/feature or change you're making ie. shay/bugfix

## 3. Make your changes in the working directory

## 4. Check which changes have been made

`git status`

## 5. Add changes to staging

`git add .` or only the file name/s you want to stage

## 6. Commit changes to your local branch

`git commit -m "commit message"`

## 7. Push your changes to GitHub

`git push` 

Or, if it's the first time pushing from your feature branch:

`git push --set-upstream origin <your-branch-name>`

## Optional

Before creating a Pull Request (PR), you may want to pull from `dev` again to make sure everything is up to date:

`git checkout dev`

`git pull`

This will show you if any changes have been made since your last merge. 

If so:

`git checkout <name of your local branch>`

`git merge dev`

`git commit -m "message"`

`git push`

## 8. Go to GitHub to create a Pull Request

A PR initiates a code review before any commits are merged to the `dev` branch.

You can create a PR from the repo's main page on GitHub.

Fill out the PR template.

Assign reviewer/s to conduct a code review before your changes are merged with the `dev` branch.

## 9. Review Changes

The assigned reviewer/s will review the PR and either approve, comment, or request changes.

All conversation and comments in the PR must be resolved before merging to the `dev` branch.

If changes have been requested, make the changes in your feature branch, git add/commit/push to update the PR for further approval.

A minimum of 2 people need to approve the PR before it can be merged into `dev`.

## 10. Approve and merge into `dev`

Once reviewer/s is happy, they can approve the PR and merge into the `dev` branch.

## 11. Delete feature branch

Delete feature branch from GitHub directly.

To delete your feature branch from your local 

`dev: git branch -d <branch-name>`

## 12. Update your local `dev` branch

Good practice is to now update your local `dev` branch: 

`git pull origin dev`

### Note:

- While someone is reviewing, you can create a new feature branch to start working on another feature - as long as, when you need to address comments, you make sure to switch to the right feature branch to update the PR.
- If there is a queue of PRs in the repo you have pushed to, you will need to `git pull` from `dev` as they are merged, to ensure your PR is up to date with `dev` when it is your turn to merge. This will hopefully prevent lost code. 

### To test a PR prior to merging (if you're reviewing someone else's code, for example)

Make sure you're all committed with your own work first. Then:

`git pull origin <branchname>`

Example:

`git checkout -b shay/homepage/test`
`git pull origin shay/homepage`

This will create a branch just for you on your local called `shay/homepage/test`, you can delete it when you're done testing.

### Pushing to `main` will only occur periodically once we know for sure that everything is working on the `dev` branch.
