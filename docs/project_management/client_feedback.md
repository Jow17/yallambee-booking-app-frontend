# Client Feedback

## 1. Business Objectives

### What is the primary goal of the app? What do you want the app/website to achieve? (e.g., Increase bookings, improve user experience, streamline management, etc.)

To make the booking experience as streamlined as possible for both the customer and the admins. Client wants the entire process to be as uncomplicated and automated as possible.

### What are the secondary objectives? (e.g., Collect customer feedback, promote the business, etc.)

Gain more control of bookings and finances

## 2. Target Audience

### Who are the primary users of the business? (e.g., tourists, business travellers, digital nomads)

Young, professional couples from the city (mostly Sydney/Canberra) that want to experience seeing a sheep and a kangaroo in a paddock lol

### Are there different types of users with different needs? (e.g., regular customers, one-time visitors)

### What is the demographic of the users? (e.g., age range, location)

Young, 20s to 30s, mostly from Sydney but also Canberra

## 3. Functionality Requirements

### Core Features:

#### What booking functionalities are required? (e.g., calendar integration, availability checks, booking confirmations)

    • User authentication
    • Single property listing (initially)
    • Booking system - allows users to check availability, book dates, and manage reservations
    • Payment integration (not MVP)
    • User reviews and ratings
    • Admin dashboard to manage listings and bookings
    • Search and filtering options for future scalability
    • Notifications - email and sms for booking confirmations, reminders, promos

#### How should payments be handled? (e.g., preferred payment gateways, security concerns)

Stripe, Paypal

#### What details should be included in the property listings? (e.g., amenities, descriptions, photos, pricing)

Description as per AirBnB, photos, videos, amenities, info about being off-grid, a 'What to expect' section so guests aren't surprised by the nature of rural, off-grid accomodation when they arrive.

### User Management:

#### What user roles will exist? (e.g., guest, admin)

User, guest, admin

#### What permissions should each role have?

Authenticated users will have the ability to manage their own profiles and reservations
Guests can browse the site but will need to make an account to create a booking
Admins can manage property listing/s, user accounts etc.

#### Is there a need for social login or just email/password registration?

### Admin Features:

#### What should the admin be able to do? (e.g., add/update/delete properties, manage bookings, view reports)

Create, update, delete properties, manage bookings, view reports

#### Should the admin be able to moderate reviews?

Unsure - 

### Notifications:

#### How should users be notified? (e.g., email, SMS)

Users can select how they would like to be notified (email or sms or both)

#### What events should trigger notifications? (e.g., booking confirmations, reminders, promotions)

Booking confirmations, reminders of upcoming bookings and payments, and promotions

## 4. Design and User Experience
 
### Branding:

#### Are there any specific branding guidelines to follow? (e.g., colours, fonts, logos)

Sage greens, emerald greens, beiges - logo provided

#### Should the app's design align with an existing website or other materials? (Are there any website designs that you already like?)

Client is happy for us to do whatever we want in terms of wireframing/design but has provided a basic colour scheme, logo, images, and video.

### User Interface:

#### Are there any specific design preferences? (e.g., minimalistic, vibrant, corporate)

Clean, crisp, modern

#### What are the preferred screen layouts for key pages (home, listing, booking)?

Optimised for mobile devices

### Accessibility:

#### Are there any accessibility requirements? (e.g., support for screen readers, keyboard navigation, colour contrast)

### Responsive Design:

#### Which devices should the app be optimised for?

Mobiel-first design, desktop and tablet

### User Flow:

#### What should the ideal user journey look like from landing on the site to completing a booking?

**1. Landing on the Homepage**

**User Action:** The user lands on the homepage, either directly or through a search engine, social media, or referral link.

**Key Elements:**

- Hero Section: A welcoming hero image or video showcasing Yallambee with a prominent search bar.
- Navigation: Clear navigation menu with options like "Home," "Explore Properties," "About Us," "Contact," and "Login/Signup."
- Call to Action: An eye-catching button or prompt encouraging users to explore available properties or start their booking process.

**2. Exploring Properties**

**User Action:** The user clicks on "Explore Properties" or uses the search bar to find properties based on their preferences (location, dates, price range, amenities).

**Key Elements:**

- Search Filters: Options to filter properties by location, date availability, price range, and amenities.
- Property Listings: A grid or list view showing available properties with thumbnails, brief descriptions, prices, and availability.
- Property Details: The user clicks on a property to view more detailed information, including images, full descriptions, amenities, user reviews, and pricing.

**3. Viewing Property Details**

**User Action:** The user selects a property to view its details.

**Key Elements:**

- Property Overview: High-quality images, detailed descriptions, and key information such as price per night, location, and available dates.
- User Reviews: Section with user reviews and ratings to build trust and provide social proof.
- Booking Form: A booking form or button (e.g., "Check Availability" or "Book Now") that allows the user to proceed with booking directly from the property page.

**4. Checking Availability**

**User Action:** The user enters their preferred dates and the number of guests to check availability.

**Key Elements:**

- Date Picker: An intuitive date picker to select check-in and check-out dates.
- Availability Confirmation: Real-time feedback on whether the selected dates are available.
- Price Calculation: Automatic calculation of the total price based on the selected dates and number of guests.

**5. Booking the Property**

**User Action:** The user decides to book the property and proceeds to the booking process.

**Key Elements:**

- Booking Form: The user fills in necessary details such as name, contact information, and any special requests.
- Summary of Booking: Display a summary of the booking details, including dates, number of guests, property name, and total price.
- Call to Action: A prominent "Proceed to Payment" button that guides the user to the next step.

**6. Payment Process**

**User Action:** The user enters payment information to confirm the booking.

**Key Elements:**

- Payment Options: Multiple payment methods (credit card, PayPal, etc.) with secure input fields.
- Billing Information: Fields for billing address and other relevant details.
- Security Assurance: Display security badges and assurances to build user confidence (e.g., "Secure Payment with Stripe").
- Confirmation: A "Pay Now" or "Confirm Booking" button to finalise the booking.

**7. Booking Confirmation**

**User Action:** The user completes the payment and receives confirmation of their booking.

**Key Elements:**

- Confirmation Page: A thank you message with booking details, confirmation number, and instructions for the stay.
- Email/SMS Confirmation: Immediate confirmation sent via email and/or SMS, including a receipt and any additional information (e.g., check-in instructions, contact details).
- Options to Manage Booking: Links or buttons to view booking details, make changes, or contact support.

**8. Post-Booking Engagement**

**User Action:** The user might want to review their booking, make changes, or explore more properties.

**Key Elements:**

- User Dashboard: Access to a user dashboard where they can view upcoming and past bookings, edit their profile, and manage their preferences.
- Promotional Offers: Display of personalised offers or recommendations for future stays.
- Social Sharing: Options to share their booking or experience on social media.

#### Key Considerations for the Ideal User Journey:

- Seamless Navigation: Ensure that each step is easy to follow, with clear navigation and prompts guiding the user forward.
- Responsiveness: The site should be fully responsive, providing a consistent experience across devices (desktop, tablet, mobile).
- Minimal Friction: Reduce the number of steps or clicks required to complete the booking. Ensure forms are simple, and data entry is minimised.
- Trust Building: Incorporate elements that build trust, such as user reviews, secure payment badges, and transparent pricing.
- Feedback and Confirmation: Provide immediate feedback at each stage, especially during availability checks and after payment, to reassure the user that their actions are successful.

## 5. Technical Requirements

### Integration:

#### Are there any third-party services or APIs that need to be integrated? (e.g., Google Maps, payment gateways, review systems)

Google Maps, Paypal, Stripe
Need to look for a review system

### Performance:

#### Are there any specific performance requirements? (e.g., page load times, uptime, scalability)

### Security:

#### Are there specific security standards that need to be adhered to? (e.g., GDPR, PCI compliance)

#### Should user data be encrypted? What kind of data protection is expected?

User data should be encrypted and stored securely

### Hosting and Deployment:

#### Does the client have a preferred hosting provider or should the team suggest one?

No preference

### Are there any specific deployment requirements?

## 6. Content Management

### Property Information:

#### Who will provide the content for property listings? (e.g., descriptions, images)

Client will provide images and content

#### How often will content need to be updated?

Unsure

### Reviews and Feedback:

#### Should users be able to leave reviews? How should these be managed?

Yes, will need to look for a review system/API

### Legal Content:

#### Are there any specific legal requirements? (e.g., terms of service, privacy policy)

Standard privacy policy and terms of service

## 7. Testing and Deployment

### Testing Requirements:

#### What level of testing does the client expect? (e.g., user testing, automated testing)

No preference

#### Are there specific scenarios that must be tested?

### Launch and Rollout:

#### What is the preferred launch date?

#### Is there a need for a soft launch or beta testing phase?

### Post-Launch Support:

#### What kind of support does the client expect after the app is live? (e.g., bug fixes, updates)

## 8. Project Constraints

### Timeline:

#### What are the critical deadlines? (e.g., Part A due date, Part B due date, presentation date)

Part A due 18th August, Part B due 1st September

### Resources:

#### Are there any specific resources you would like to provide? (e.g., content, images)

## 9. Future Considerations

### Scalability:

#### Does the client expect the app to scale in the future? (e.g., adding more tiny homes, supporting more users)

Yes, app must be scalable so admins can add more properties

### Future Features:

#### Are there any features planned for the future that should be considered in the current development?

Not at this stage

## 10. Communication and Reporting

### Progress Updates:

#### How often do you want updates on the project’s progress? (e.g., daily, weekly, bi-weekly)

Weekly update and feedback

### Preferred Communication Channels:

#### What are the preferred communication channels? (e.g., email, phone)

### Feedback Process:

#### How will feedback be provided and handled during the development process?