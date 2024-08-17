# Ways of Working

## Full Stack Group Project: Yallambee Tiny Homes Booking Platform

### Team: Jonathan, Jemma, Shay

## Introduction

This document outlines our team's practices and procedures for working effectively on our project. Our goal is to maintain a high standard of quality, consistency, and collaboration.

## Communication

- **Regular Meetings**: Daily 15 minute standups.
- **Chat Platform**: Use Discord for daily communication.
- **Issues/Discussions**: For code-related discussions, use Discord, GitHub Issues, or Discussions.

## Branching Strategy - GitHub Flow

- **GitHub Flow**: This strategy is set up so that there is a main branch, which serves as our production branch - and will only be merged once everything is working as it should be in dev, a default branch - dev - that serves as the development branch, and individual feature branches where team members can work on adding new features without compromising the dev or main branch.
- **Main Branch**: The `main` branch is our production branch.
- **Dev Branch**: The `dev` branch is our development branch.
- **Feature Branches**: Create a new branch for each feature, named `[name/issue-or-feature-you-are-working-on]`.
- **Hotfixes**: Hotfix branches, named `[hotfix/issue-name]`, are for urgent fixes.

*The basic GitHub Flow process*:

1. Create a branch
2. Edit the branch
3. Create a pull request
4. Merge the pull request
5. Delete the branch

## Coding Practices

- **Code Style**: Follow the JavaScript Standard Style for both frontend and backend code.
- **Documentation**: Comment your code and update the README as needed.

## Pull Requests and Code Reviews

- **Pull Requests (PRs)**: All changes must be made through PRs. Describe your changes clearly, use the template.
- **Review Process**: Each PR requires at least 2 reviews.
- **Merge Criteria**: Reviews must be conducted by someone other than the developer who intitated the PR. No pending conversations. No pending change requests.
- **Stale PRs**: If you’ve created a PR, gotten a review, then made a change to the PR (by making a commit to that PR, for example), the existing review will be dismissed and you will be required to make a new PR.

## Testing

- Unit Testing: Write unit tests for all components and functions.
- Integration Testing: Conduct integration tests to ensure different parts of the application work together.
- End-to-End Testing:
- Continuous Integration:

## Deployment

- Environment Setup: Maintain separate environments for development, staging, and production.
- CI/CD Pipeline:
- Hosting:
- Monitoring:

## Issue Tracking

- **Creating Issues**: Clearly describe the issue or feature request with a meaningful title and detailed description. Use the template. 
- **Assigning Issues**: Assign yourself to an issue you're working on and label it appropriately.
- **Updating Progress**: Regularly update the issue to reflect the current status.

## Security Practices

- **Sensitive Data**: Never commit sensitive data to the repository.

## Continuous Improvement

- **Feedback on Practices**: Regularly discuss and update our ways of working to reflect best practices and team needs.
