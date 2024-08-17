# Full Stack Project Timeline

## Week 1: August 9th - August 15th

### Day 1-2: August 9th - August 10th

**Task**: Initial Project Setup

- Set up the development environment and repositories.
- Create a project plan and assign roles within the team.
- Set up project management tools and establish a workflow.
- **Priority**: High

### Day 3-4: August 11th - August 12th

**Task**: Define User Stories and Requirements

- Gather detailed requirements and user stories.
- Finalise user roles and scenarios.
- Add to Kanban board with deadlines, priorities etc
- **Priority**: High

### Day 5-7: August 13th - August 15th

**Task**: Wireframes and Design

- Create wireframes for all key screens (homepage, property listing, booking page, user profile, admin dashboard) for multiple screen sizes.
- Design logo, select fonts and colors.
- Get feedback and iterate on designs.
- **Priority**: High

## Week 2: August 16th - August 22nd

### Day 8-9: August 16th - August 17th

**Task**: Data Flow Diagram and Application Architecture Design

- Create the data flow diagrams, level 0 and level 1.
- Design the application architecture diagram.
- **Priority**: High

**Task**: Part A Submission

- Update README for submission
- Include Kanban board screenshots
- submit Part A
- **Priority**: High

## Updated due to finishing Part A early - below is for Part B

## Week 1: August 15th - August 21st

### Day 1-2: August 15th - August 16th

**Task**: Initial Setup & User Authentication Development

- **User Story 1**: Implement User Registration
  - [ ] Set up the React environment.
  - [ ] Design the registration form UI.
  - [ ] Implement backend logic for user registration in Express.js.
  - [ ] Set up MongoDB to store user data securely.
  - [ ] Integrate password hashing (e.g., using bcrypt).
  - [ ] Set up JWT authentication and issue tokens upon successful registration.
  - [ ] Implement email confirmation using Nodemailer.
  - [ ] Test registration flow end-to-end.
  
- **User Story 2**: Implement User Login
  - [ ] Design the login form UI.
  - [ ] Implement backend logic for user authentication.
  - [ ] Set up JWT token generation and storage in cookies or local storage.
  - [ ] Handle error messages for invalid login attempts.
  - [ ] Test login flow with valid and invalid credentials.

- **User Story 3**: Implement Password Reset Functionality
  - [ ] Design password reset request UI.
  - [ ] Implement backend logic for password reset requests.
  - [ ] Set up email with password reset link using Nodemailer.
  - [ ] Implement password reset form and logic.
  - [ ] Test password reset process from request to completion.

**Priority**: High

### Day 3-4: August 17th - August 18th

**Task**: Property Listing/s Development

- **User Story 4**: Implement Property Listing Page
  - [ ] Design property listing page UI.
  - [ ] Implement backend API to retrieve property listings.
  - [ ] Develop frontend logic to display properties with thumbnails, names, locations, and prices.
  - [ ] Implement search filters for location, price range, and amenities.
  - [ ] Display property availability status.
  - [ ] Test property listing and filtering functionality.

- **User Story 5**: Implement Property Details Page
  - [ ] Design property details page UI.
  - [ ] Implement backend API to retrieve detailed property information.
  - [ ] Display property images, descriptions, amenities, and reviews.
  - [ ] Show price per night and availability for selected dates.
  - [ ] Test the property details page for accurate data display.

**Priority**: High

### Day 5-7: August 19th - August 21st

**Task**: Booking System Development

- **User Story 6**: Implement Availability Check
  - [ ] Design booking date selection UI using a date picker.
  - [ ] Implement backend logic to check property availability based on selected dates.
  - [ ] Display availability status dynamically as the user selects dates.
  - [ ] Test availability check process with various date ranges.

- **User Story 7**: Implement Booking Process
  - [ ] Design booking form UI.
  - [ ] Implement backend logic for creating bookings.
  - [ ] Display a booking summary before confirmation.
  - [ ] Integrate payment gateway (if ready) or placeholder for future integration.
  - [ ] Test the entire booking process, including form submission and backend updates.

- **User Story 8**: Implement Booking Confirmation Email
  - [ ] Set up email notification service using Nodemailer.
  - [ ] Create email templates for booking confirmations.
  - [ ] Implement backend logic to trigger email upon booking confirmation.
  - [ ] Test email notifications for accuracy and reliability.

**Priority**: High

## Week 2: August 22nd - August 28th

### Day 8-10: August 22nd - August 24th

**Task**: Admin Dashboard & Payment Integration

- **User Story 14**: Implement Property Management in Admin Dashboard
  - [ ] Design admin dashboard UI with sections for property management, bookings, and reviews.
  - [ ] Implement backend API for CRUD operations on properties.
  - [ ] Enable admin to add, update, and delete properties.
  - [ ] Ensure real-time updates to property listings.
  - [ ] Test property management functionality for completeness.

- **User Story 9**: Implement Booking Management in Admin Dashboard
  - [ ] Design booking management UI within the admin dashboard.
  - [ ] Implement backend API to retrieve and manage bookings.
  - [ ] Enable admin to modify or cancel bookings.
  - [ ] Display booking statuses (e.g., confirmed, pending, cancelled) clearly.
  - [ ] Test booking management functionality from an admin perspective.

- **User Story 10**: Implement Payment Processing (Stretch Feature)
  - [ ] Design payment form UI for users.
  - [ ] Integrate Stripe or another payment gateway for secure transactions.
  - [ ] Implement backend logic to handle payment processing.
  - [ ] Generate and display payment confirmation for users.
  - [ ] Test payment flow thoroughly, including edge cases and error handling.

**Priority**: High

### Day 11-13: August 25th - August 27th

**Task**: User Profile & Reviews

- **User Story 12**: Implement User Profile Management
  - [ ] Design user profile page UI.
  - [ ] Implement backend API to retrieve and update user profile information.
  - [ ] Develop frontend logic for profile updates.
  - [ ] Ensure real-time update of profile information upon changes.
  - [ ] Test profile management functionality for accuracy.

- **User Story 13**: Implement Booking History in User Profile
  - [ ] Design booking history section within the user profile.
  - [ ] Implement backend API to retrieve booking history for logged-in users.
  - [ ] Display past and upcoming bookings clearly, with options to view details.
  - [ ] Test booking history display and functionality.

- **User Story 16**: Implement User Reviews & Ratings (Stretch Feature)
  - [ ] Design review submission UI.
  - [ ] Implement backend API to handle review and rating submissions.
  - [ ] Develop frontend logic to display user reviews and ratings on property pages.
  - [ ] Test review submission and display functionality.

- **User Story 17**: Implement Review Moderation in Admin Dashboard
  - [ ] Design review moderation UI within the admin dashboard.
  - [ ] Implement backend logic for review approval and rejection.
  - [ ] Enable admin to edit or delete inappropriate reviews.
  - [ ] Test review moderation process thoroughly.

**Priority**: Medium

### Day 14-16: August 28th - August 30th

**Task**: Notifications & Final Testing

- **User Story 18**: Implement User Notifications (Stretch Feature)
  - [ ] Set up email and SMS notification services.
  - [ ] Implement backend logic to trigger notifications based on user actions (e.g., booking confirmations, payment receipts).
  - [ ] Create notification templates for different scenarios.
  - [ ] Enable user preference settings for notifications (opt-in/opt-out).
  - [ ] Test notifications for accuracy and timing.

- **User Story 19**: Implement Admin Notifications
  - [ ] Set up notification system for admins (e.g., new bookings, cancellations).
  - [ ] Implement backend logic for triggering admin notifications.
  - [ ] Ensure notifications include all necessary information (booking ID, user info, dates).
  - [ ] Test admin notifications to ensure they are received correctly.

- **Final Testing**:
  - [ ] Conduct end-to-end testing of all user stories and features.
  - [ ] Perform user acceptance testing (UAT) to ensure the app meets the client’s expectations.
  - [ ] Fix any bugs or issues that arise during testing.

**Priority**: High

## Week 3: August 31st - September 1st

### Day 17-18: August 31st - September 1st

**Task**: Final Deployment & Presentation Preparation

- **Final Deployment**:
  - [ ] Deploy the application to a cloud hosting service (e.g., AWS, Heroku).
  - [ ] Perform final testing in the production environment.
  - [ ] Ensure that all services (frontend, backend, database) are fully operational.
  - [ ] Finalise the README with details about the setup, deployment, and API documentation.

- **Presentation Preparation**:
  - [ ] Prepare a detailed presentation covering the project overview, key features, challenges, and solutions.
  - [ ] Include wireframes, DFD, architecture diagrams, and a live demo of the app.
  - [ ] Rehearse the presentation as a team to ensure smooth delivery.
  
- **Presentation Day (August 31st)**:
  - [ ] Deliver the presentation, ensuring all aspects of the project are covered and well-rehearsed.

**Priority**: High

### Day 19: September 1st

**Task**: Final Documentation and Review

- [ ] Finalise all project documentation, including the user manual, API documentation, and developer notes.
- [ ] Review the entire project to ensure that all requirements have been met.
- [ ] Submit the final project before the deadline.

**Priority**: High

## Continuous Tasks

- **Daily Standups**: 15-minute daily meetings to discuss progress, blockers, and plans.
- **Code Reviews**: Conduct code reviews regularly to ensure quality and consistency.
- **Documentation**: Maintain up-to-date documentation throughout the project.
- **Client Feedback**: Regularly communicate with the client to gather feedback and adjust the development process as needed.

### Priorities Recap

- **High Priority**: Core functionality, deadlines, presentation preparation, final deployment, and documentation.
- **Medium Priority**: Additional features and final polish.
