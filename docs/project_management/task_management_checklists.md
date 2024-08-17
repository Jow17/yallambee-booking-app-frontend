# Task Checklists

## 1. Project Planning and Setup

- **Task 1.1**: Define project requirements and features (**all developers**)
  - [ ] Finalise detailed user stories and acceptance criteria.
  - [ ] Create wireframes and design mockups.
  - [ ] Develop data flow diagrams (DFD) and application architecture diagram.

- **Task 1.2**: Set up Git repository and branching strategy (**Developer A**)
  - [ ] Initialise a Git repository on GitHub.
  - [ ] Create branches for `development`, `feature`, and `main`.
  - [ ] Define and document the branching strategy in the README.

- **Task 1.3**: Set up project management tools (e.g., Trello, Jira) and task delegation (**Developer A**)
  - [ ] Create a Trello board with columns for Backlog, To Do, In Progress, Review, and Done.
  - [ ] Assign tasks to team members according to the project timeline.

- **Task 1.4**: Initialise the backend with Node.js, Express, and create the initial project structure (**Developer B**)
  - [ ] Set up Node.js and Express.js.
  - [ ] Create a basic folder structure and initialise `package.json`.
  - [ ] Install necessary dependencies (Express, Mongoose, etc.).

- **Task 1.5**: Initialise the frontend with React and create the initial project structure (**Developer C**)
  - [ ] Set up a React environment using Create React App (CRA).
  - [ ] Create a basic folder structure.
  - [ ] Install necessary dependencies (React Router, Axios, etc.).

- **Task 1.6**: Create and share a `.env.example` file for environment variables (**Developer B**)
  - [ ] Identify required environment variables (e.g., API keys, database URL).
  - [ ] Create a `.env.example` file and share it with the team.

## 2. Backend Development

- **Task 2.1**: Set up MongoDB database and configure connection (**Developer B**)
  - [ ] Set up a MongoDB cluster (Atlas or local).
  - [ ] Configure the connection in the backend using Mongoose.
  
- **Task 2.2**: Design and create Mongoose models
  - **User Model (Developer B)**
    - [ ] Define schema for user data (name, email, password, etc.).
    - [ ] Implement schema validation.
  - **Property Model (Developer B)**
    - [ ] Define schema for property data (name, location, price, etc.).
    - [ ] Implement schema validation.
  - **Booking Model (Developer B)**
    - [ ] Define schema for booking data (user, property, dates, etc.).
    - [ ] Implement schema validation.
  - **Review Model (Developer B)**
    - [ ] Define schema for review data (user, property, rating, comments).
    - [ ] Implement schema validation.

- **Task 2.3**: Create API routes and controllers
  - **User Authentication (Developer B)**
    - [ ] Implement registration, login, and profile management routes.
    - [ ] Secure API endpoints using JWT.
  - **Property Listing (CRUD operations) (Developer B)**
    - [ ] Implement routes for creating, reading, updating, and deleting property listings.
  - **Booking System (CRUD operations) (Developer B)**
    - [ ] Implement routes for creating, reading, updating, and deleting bookings.
  - **Review System (CRUD operations) (Developer B)**
    - [ ] Implement routes for creating, reading, updating, and deleting reviews.

- **Task 2.4**: Implement Payment Integration (**Developer B**)
  - **Payment Processing with Stripe**:
    - [ ] Set up Stripe account and obtain API keys.
    - [ ] Implement backend API for handling payment processing.
    - [ ] Create payment intents on the server-side for bookings.
    - [ ] Secure payment endpoints and validate payment information.
    - [ ] Handle webhooks from Stripe for payment confirmations and updates.
  - **Payment Flow Integration**:
    - [ ] Ensure that the booking is confirmed only after successful payment.
    - [ ] Update booking status based on payment confirmation.
    - [ ] Implement refund functionality (optional) for cancellations.

- **Task 2.5**: Implement notifications system (email/SMS) using Nodemailer/Twilio (**Developer B**)
  - [ ] Set up Nodemailer for email notifications.
  - [ ] Set up Twilio for SMS notifications.
  - [ ] Integrate notification triggers within the relevant API endpoints (e.g., booking confirmation).

- **Task 2.6**: Set up error handling and validation for API requests (**Developer B**)
  - [ ] Implement global error handling middleware.
  - [ ] Validate incoming requests using libraries like Joi or custom validation logic.

- **Task 2.7**: Apply Security Best Practices for Express.js (**Developer B**)
  - [ ] Use Helmet to secure Express apps by setting various HTTP headers.
  - [ ] Implement rate limiting to prevent DDoS attacks.
  - [ ] Sanitise user input to prevent SQL injection and XSS attacks.

- **Task 2.8**: Implement Caching for API Responses (**Developer B**)
  - [ ] Use Redis or another caching layer to store frequently accessed data, such as property listings.
  - [ ] Configure cache expiration policies.

- **Task 2.9**: Version the API (**Developer B**)
  - [ ] Implement API versioning (e.g., `v1` in the API routes) to allow for future changes without breaking existing functionality.

- **Task 2.10**: Create API documentation (e.g., Swagger) (**Developer B**)
  - [ ] Document all API endpoints using Swagger or a similar tool.
  - [ ] Ensure that documentation is clear and accessible.

## 3. Frontend Development

- **Task 3.1**: Set up React Router for navigation (**Developer C**)
  - [ ] Implement React Router for client-side routing.
  - [ ] Define routes for Home, Property Listings, Booking, Profile, and Admin Dashboard.

- **Task 3.2**: Create reusable UI components
  - **Header and Footer (Developer C)**
    - [ ] Design and implement a responsive header and footer.
  - **Property Card (Developer C)**
    - [ ] Create a reusable component for displaying property details.
  - **Booking Form (Developer C)**
    - [ ] Create a booking form component with dynamic date pickers.
    - [ ] Integrate Stripe for payment processing on the booking form.
  - **Review Form (Developer C)**
    - [ ] Create a review submission form with rating functionality.
  - **Notifications UI (Developer C)**
    - [ ] Design and implement UI for displaying notifications to users.

- **Task 3.3**: Create main pages
  - **Home Page (Developer C)**
    - [ ] Design and implement the homepage with a hero section and featured properties.
  - **Property Listing Page (Developer C)**
    - [ ] Implement the property listing page, integrating the Property Card component.
  - **Booking Page (Developer C)**
    - [ ] Implement the booking page, integrating the Booking Form component.
    - [ ] Implement Stripe payment integration on the booking page.
  - **Profile Page (Developer C)**
    - [ ] Implement the user profile page, displaying user information and booking history.
  - **Admin Dashboard (Developer C)**
    - [ ] Implement the admin dashboard with sections for managing properties, bookings, and reviews.

- **Task 3.4**: Integrate with backend API (e.g., Axios or Fetch) (**Developer C**)
  - [ ] Implement API calls using Axios or Fetch to connect frontend components with backend routes.

- **Task 3.5**: Implement state management (e.g., using Context API or Redux) (**Developer C**)
  - [ ] Set up global state management using Context API or Redux.
  - [ ] Manage user authentication state, property listings, bookings, etc.

- **Task 3.6**: Implement Loading States and Error Handling in UI (**Developer C**)
  - [ ] Add loading indicators for asynchronous operations like data fetching and form submission.
  - [ ] Implement global error handling for API requests to provide users with meaningful feedback.

- **Task 3.7**: Implement Mobile Responsiveness Testing (**Developer C**)
  - [ ] Test the application on various devices and screen sizes.
  - [ ] Optimise UI components for mobile and tablet views.

- **Task 3.8**: Style the application (CSS, Bootstrap, Tailwind CSS) (**Developer C**)
  - [ ] Implement responsive styling using a CSS framework or custom CSS.
  - [ ] Ensure the application is visually appealing and consistent across devices.

- **Task 3.9**: Ensure Accessibility Compliance (**Developer C**)
  - [ ] Implement ARIA roles and attributes for better accessibility.
  - [ ] Test the application with screen readers and other assistive technologies.
  - [ ] Follow WCAG guidelines to ensure the app is usable for people with disabilities.

## 4. Testing

- **Task 4.1**: Write unit tests for backend API using Jest/Mocha (**Developer A**)
  - [ ] Write unit tests for all backend controllers and services.
  - [ ] Ensure comprehensive coverage for each API route.

- **Task 4.2**: Write integration tests for backend using Supertest (**Developer A**)
  - [ ] Write integration tests to ensure that API routes work as expected.
  - [ ] Test interactions between various components (e.g., database, API).

- **Task 4.3**: Write unit tests for frontend components using React Testing Library (**Developer A**)
  - [ ] Write tests for individual React components.
  - [ ] Test component rendering, props, and state management.

- **Task 4.4**: Conduct end-to-end testing with tools like Cypress (**Developer A**)
  - [ ] Set up Cypress for end-to-end testing.
  - [ ] Write tests that simulate user interactions (e.g., booking a property, processing payments).

- **Task 4.5**: Implement Linting and Prettier (**Developer A**)
  - [ ] Set up ESLint for consistent code style across the project.
  - [ ] Integrate Prettier for automatic code formatting.
  - [ ] Add linting and formatting scripts in `package.json` to run before commits.
  - [ ] Configure Git hooks using Husky to enforce linting and formatting on every commit.

- **Task 4.6**: Add Automated Tests to CI Pipeline (**Developer A**)
  - [ ] Integrate Jest, Mocha, or Cypress tests into the GitHub Actions pipeline.
  - [ ] Ensure that tests are run automatically on every pull request and commit.

- **Task 4.7**: Perform user acceptance testing and gather feedback (**all developers**)
  - [ ] Conduct UAT sessions with the client.
  - [ ] Gather feedback and iterate on the application based on suggestions.

- **Task 4.8**: Document testing results and fixes (**Developer A**)
  - [ ] Record test results, including any issues encountered and how they were resolved.

## 5. Deployment

- **Task 5.1**: Set up CI/CD pipeline (e.g., GitHub Actions) for automated deployment (**Developer A**)
  - [ ] Create a CI/CD pipeline for continuous integration and deployment.
  - [ ] Automate testing and deployment processes.

- **Task 5.2**: Deploy backend to a cloud service (e.g., Heroku, AWS) (**Developer B**)
  - [ ] Deploy the Node.js backend to Heroku or AWS.
  - [ ] Configure environment variables for the production environment.

- **Task 5.3**: Deploy frontend to a hosting service (e.g., Netlify, Vercel) (**Developer C**)
  - [ ] Deploy the React frontend to Netlify or Vercel.
  - [ ] Ensure seamless integration with the deployed backend.

- **Task 5.4**: Set up environment-specific configurations (**Developer B**)
  - [ ] Set up different environment configurations for development, testing, and production (e.g., database URLs, API keys).
  - [ ] Use `dotenv` to manage environment variables securely.

- **Task 5.5**: Set up environment variables for production (**Developer B**)
  - [ ] Configure environment variables specific to the production environment.
  - [ ] Ensure that sensitive data is securely managed.

- **Task 5.6**: Implement Load Balancing and Auto-Scaling (**Developer B**)
  - [ ] Set up load balancing for the backend services to distribute traffic evenly.
  - [ ] Configure auto-scaling based on traffic demands to handle varying loads.

- **Task 5.7**: Monitor deployed application for any issues (**all developers**)
  - [ ] Set up monitoring tools to track application performance and errors.
  - [ ] Address any issues that arise post-deployment.

- **Task 5.8**: Perform final tests in the production environment (**Developer A**)
  - [ ] Conduct final testing to ensure the application functions correctly in production.
  - [ ] Validate that all features, including payment processing, are working as intended.

## 6. Documentation and Handoff

- **Task 6.1**: Write documentation for setting up the project locally (**Developer B**)
  - [ ] Provide instructions for setting up the project on a local machine.

- **Task 6.2**: Document API endpoints and usage (**Developer B**)
  - [ ] Create detailed documentation for all API endpoints.
  - [ ] Include examples and expected responses.

- **Task 6.3**: Document frontend component structure and usage (**Developer C**)
  - [ ] Document the structure of frontend components.
  - [ ] Provide usage examples for each component.

- **Task 6.4**: Set Up Application Monitoring and Logging (**All Developers**)
  - [ ] Implement application monitoring using tools like New Relic or Datadog.
  - [ ] Set up centralised logging for tracking errors and performance issues (e.g., using Winston or Loggly).

- **Task 6.5**: Prepare a Deployment Guide (**Developer B**)
  - [ ] Create a detailed guide for deploying the application, including steps for setting up the environment, deploying the code, and managing updates.

- **Task 6.6**: Implement User Activity Tracking (**Developer B**)
  - [ ] Use Google Analytics or a similar tool to track user interactions (e.g., page views, bookings made).
  - [ ] Analyse user behaviour to improve UX and optimise conversion rates.

- **Task 6.7**: Set Up Automated Database Backups (**Developer B**)
  - [ ] Schedule regular backups of the MongoDB database.
  - [ ] Store backups securely in a cloud storage service (e.g., AWS S3).
  - [ ] Implement a process for restoring data from backups in case of data loss.

- **Task 6.8**: Create a final project report/presentation for submission (**all developers**)
  - [ ] Prepare a report summarising the project, including key features, challenges, and solutions.
  - [ ] Create a presentation for the final submission.

## 7. Final Review and Submission

- **Task 7.1**: Review the entire project for any missed requirements or issues (**all developers**)
  - [ ] Conduct a thorough review to ensure all requirements have been met.
  - [ ] Fix any outstanding issues.

- **Task 7.2**: Ensure that all features are working as expected and the UI is intuitive (**all developers**)
  - [ ] Perform a final review of the UI/UX to ensure it meets client expectations.
  - [ ] Make any necessary adjustments.

- **Task 7.3**: Schedule Regular Client Check-Ins (**All Developers**)
  - [ ] Set up weekly meetings with the client to review progress, gather feedback, and make necessary adjustments.

- **Task 7.4**: Prepare a Handover Document (**All Developers**)
  - [ ] Document any custom configurations, known issues, and future considerations.
  - [ ] Provide the client or future developers with all the information needed to maintain and update the application.

- **Task 7.5**: Submit the project as per the assignment guidelines (**Developer A**)
  - [ ] Ensure that all project files, documentation, and presentations are properly organised.
  - [ ] Submit the project according to the assignment guidelines.

### Task Allocation (Suggested)

- **Developer A**: Project setup, Git/CI-CD, Testing, Deployment, Final Review
- **Developer B**: Backend development, Database, API, Payment Integration, Security, Caching, Deployment, Documentation
- **Developer C**: Frontend development, UI/UX, API Integration, State Management, Accessibility, Deployment, Documentation
