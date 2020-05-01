# Contributing to Irving
This document is intended to make contributing to this project easier, more transparent, and more standardized.

## Commitizen
This project uses [Commitizen](https://github.com/commitizen/cz-cli) and [Conventional Changelog](https://github.com/conventional-changelog/conventional-changelog) to standardize commit messages and changelogs. This means when you enter `git commit` to commit your code you will see a (maybe) unfamiliar, interactive series of questions. These questions will result in a standardized format for your commit message. If you have any questions about the possible categories, scopes, etc. please create an issue in GitHub and we will do our best to respond.

Note: For merge commits, just use `chore` for the type of change, `merge` for the scope, and `merge commit` for the message. Likely, however, it will not matter what you put into Commitizen as you'll just get a normal merge commit message such as `Merge branch 'my-branch' into develop`.

## Git Workflow and Branches
Specific branches will be used for specific purposes in this repo. Considering this, the lifecycle of a new feature, bugfix, etc. should largely follow the steps below.

### If you are a community contributor:
1. Fork the Irving repo.
2. `git checkout master` - check out the NPM package release branch.
3. `git checkout -b feature/issue-17/branch-title` - create a new feature branch based on master. If your branch relates to a specific GitHub issue, reference that issue in your branch name (and all subsequent commits).
4. `npm run test` and/or `npm run test:watch` - If you've fixed a bug or added a new feature, please write tests! These commands can be used to run tests from within the package you are modifying or at the root of the repo if you want to run all tests for all packages.
5. Work on your branch, using `npm link` where necessary to test out your code.
6. When ready, push your code and create a pull request into `master` branches.
7. Your code will be reviewed by someone at Alley.
8. Once your code passes review, someone at Alley will merge it into `master` and include it in the next publish to npm on the `@beta` or `@rc` tag.
10. Keep an eye on the releases page. When you see your code has been released, _install and test it!_.
11. Assuming neither you nor someone at Alley finds issues with your code, someone at Alley will approve and merge your PR to `master` and include it in the next `@latest` release.

### Publishing Irving
If you are a part of the Alley organization and have publish capabilities for the npm packages, check out the (publishing docs)[PUBLISHING.md]

### If an issue is found with your code in a prerelease:
1. If someone at Alley finds an issue with your code, we will ask you to address the issue. Hopefully any issues will be caught before this point, however.
2. If you are unable to address the issue:
* We will attempt to address it ourselves OR
* We will revert your pull request until you are able to address the issues.