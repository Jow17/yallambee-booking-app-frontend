# API Specifications

## 1. Users

### Endpoint: `/user/register`

- **Method:** POST
- **Description:** Register a new user.
- **Request Body:**

```json
{
  "name": "John Doe",
  "email": "johndoe@example.com",
  "password": "password123"
}
```

**Response:**

- **201 Created:** User registered successfully.
- **400 Bad Request:** Missing fields or email already taken.

### Endpoint: `/user/login`

- **Method:** POST
- **Description:** Log in an existing user.
- **Request Body:**

```json
{
  "email": "johndoe@example.com",
  "password": "password123"
}
```

**Response:**

- **200 OK:** Login successful, returns JWT token.
- **401 Unauthorized:** Incorrect email or password.

### Endpoint: `/user/profile`

- **Method:** GET
- **Description:** Retrieve the logged-in user’s profile.
- **Headers:** Authorization: Bearer `<jwt-token-string>`

**Response:**

- **200 OK:** Returns user profile data.
- **401 Unauthorized:** Invalid or expired token.

### Endpoint: `/user/profile`

- **Method:** PUT
- **Description:** Update the logged-in user’s profile.
- **Headers:** Authorization: Bearer `<jwt-token-string>`
- **Request Body:**

```json
{
  "name": "John Doe",
  "email": "newemail@example.com",
  "password": "newpassword123"
}
```

**Response:**

- **200 OK:** User profile updated successfully.
- **400 Bad Request:** Invalid input data.
- **401 Unauthorized:** Invalid or expired token.

### Endpoint: `/user/profile`

- **Method:** DELETE
- **Description:** Delete the logged-in user’s account.
- **Headers:** Authorization: Bearer `<jwt-token-string>`

**Response:**

- **200 OK:** User account deleted successfully.
- **401 Unauthorized:** Invalid or expired token.

## 2. Property Listing/s

### Endpoint: `/properties`

- **Method:** GET
- **Description:** Retrieve a list of all available properties.
- **Query Parameters (Optional):**
  - **location:** Filter by location.
  - **priceRange:** Filter by price range.
  - **amenities:** Filter by amenities.

**Response:**

- **200 OK:** Returns a list of properties.

### Endpoint: `/properties/:id`

- **Method:** GET
- **Description:** Retrieve details of a specific property.
- **Path Parameters:**
  - **id:** The ID of the property to retrieve.

**Response:**

- **200 OK:** Returns property details.
- **404 Not Found:** Property with the specified ID not found.

### Endpoint: `/properties`

- **Method:** POST
- **Description:** Add a new property (Admin only).
- **Headers: Authorization:** Bearer `<jwt-token-string>`
- **Request Body:**

```json
{
  "name": "Luxury Tiny Home",
  "description": "A luxurious, off-grid tiny home with all the amenities.",
  "location": "Farm Stay",
  "pricePerNight": 250,
  "amenities": ["Firepit", "Air Conditioning", "BBQ"],
  "images": ["image1.jpg", "image2.jpg"]
}
```

**Response:**

- **201 Created:** Property created successfully.
- **401 Unauthorized:** User is not an admin.
- **400 Bad Request:** Missing or invalid fields.

### Endpoint: `/properties/:id`

- **Method:** PUT
- **Description:** Update an existing property (Admin only).
- **Headers:** Authorization: Bearer `<jwt-token-string>`
- **Path Parameters:**
  - **id:** The ID of the property to update.
- **Request Body:**

```json
{
  "name": "Updated Tiny Home",
  "description": "An updated description.",
  "location": "Updated Location",
  "pricePerNight": 300,
  "amenities": ["Updated", "Amenities"],
  "images": ["image1.jpg", "image2.jpg"]
}
```

**Response:**

- **200 OK:** Property updated successfully.
- **400 Bad Request:** Invalid input data.
- **401 Unauthorized:** User is not an admin.
- **404 Not Found:** Property with the specified ID not found.

### Endpoint: `/properties/:id`

- **Method:** PATCH
- **Description:** Partially update an existing property (Admin only).
- **Headers:** Authorization: Bearer `<jwt-token-string>`
- **Path Parameters:**
  - **id:** The ID of the property to update.
- **Request Body (Example):**

```json
{
  "pricePerNight": 275
}
```

**Response:**

- **200 OK:** Property updated successfully.
- **400 Bad Request:** Invalid input data.
- **401 Unauthorized:** User is not an admin.
- **404 Not Found:** Property with the specified ID not found.

### Endpoint: `/properties/:id`

- **Method:** DELETE
- **Description:** Delete an existing property (Admin only).
- **Headers:** Authorization: Bearer `<jwt-token-string>`
- **Path Parameters:**
  - **id:** The ID of the property to delete.

**Response:**

- **200 OK:** Property deleted successfully.
- **401 Unauthorized:** User is not an admin.
- **404 Not Found:** Property with the specified ID not found.

## 3. Bookings

### Endpoint: `/bookings`

- **Method:** GET
- **Description:** Retrieve a list of all bookings (Admin only).
- **Headers:** Authorization: Bearer `<jwt-token-string>`

**Response:**

- **200 OK:** Returns a list of bookings.
- **401 Unauthorized:** User is not an admin.

### Endpoint: `/bookings/:id`

- **Method:** GET
- **Description:** Retrieve details of a specific booking.
- **Headers:** Authorization: Bearer `<jwt-token-string>`
- **Path Parameters:**
  - **id:** The ID of the booking to retrieve.

**Response:**

- **200 OK:** Returns booking details.
- **401 Unauthorized:** User is not authenticated or lacks permission.
- **404 Not Found:** Booking with the specified ID not found.

### Endpoint: `/bookings`

- **Method:** POST
- **Description:** Create a new booking.
- **Headers:** Authorization: Bearer `<jwt-token-string>`
- **Request Body:**

```json
{
  "propertyId": "60d0fe4f5311236168a109cb",
  "checkIn": "2024-09-01T14:00:00Z",
  "checkOut": "2024-09-05T11:00:00Z",
  "guests": 2
}
```

**Response:**

- **201 Created:** Booking created successfully.
- **400 Bad Request:** Missing or invalid fields.
- **401 Unauthorized:** User is not authenticated.

### Endpoint: `/bookings/:id`

- **Method:** PUT
- **Description:** Update an existing booking.
- **Headers:** Authorization: Bearer `<jwt-token-string>`
- **Path Parameters:**
  - **id:** The ID of the booking to update.
- **Request Body:**

```json
{
  "checkIn": "2024-09-02T14:00:00Z",
  "checkOut": "2024-09-06T11:00:00Z",
  "guests": 3
}
```

**Response:**

- **200 OK:** Booking updated successfully.
- **400 Bad Request:** Invalid input data.
- **401 Unauthorized:** User is not authenticated or lacks permission.
- **404 Not Found:** Booking with the specified ID not found.

### Endpoint: `/bookings/:id`

- **Method:** PATCH
- **Description:** Partially update an existing booking.
- **Headers:** Authorization: Bearer `<jwt-token-string>`
- **Path Parameters:**
  - **id:** The ID of the booking to update.
- **Request Body (Example):**

```json
{
  "guests": 4
}
```

**Response:**

- **200 OK:** Booking updated successfully.
- **400 Bad Request:** Invalid input data.
- **401 Unauthorized:** User is not authenticated or lacks permission.
- **404 Not Found:** Booking with the specified ID not found.

### Endpoint: `/bookings/:id`

- **Method:** DELETE
- **Description:** Cancel an existing booking.
- **Headers:** Authorization: Bearer `<jwt-token-string>`
- **Path Parameters:**
  - **id:** The ID of the booking to cancel.

**Response:**

- **200 OK:** Booking cancelled successfully.
- **401 Unauthorized:** User is not authenticated or lacks permission.
- **404 Not Found:** Booking with the specified ID not found.

## 4. Payments

### Endpoint: `/payments`

- **Method:** GET
- **Description:** Retrieve a list of all payments (Admin only).
- **Headers:** Authorization: Bearer `<jwt-token-string>`

**Response:**

- **200 OK:** Returns a list of payments.
- **401 Unauthorized:** User is not an admin.

### Endpoint: `/payments/charge`

- **Method:** POST
- **Description:** Process a payment for a booking.
- **Headers:** Authorization: Bearer `<jwt-token-string>`
- **Request Body:**

```json
{
  "bookingId": "60d0fe4f5311236168a109cd",
  "paymentMethod": "stripe",
  "amount": 600,
  "currency": "AUD"
}
```

**Response:**

- **200 OK:** Payment processed successfully.
- **400 Bad Request:** Payment failed or invalid payment method.
- **401 Unauthorized:** User is not authenticated.

### Endpoint: `/payments/:id/refund`

- **Method:** POST
- **Description:** Refund a payment for a booking.
- **Headers:** Authorization: Bearer `<jwt-token-string>`
- **Path Parameters:**
  - **id:** The ID of the payment to refund.
- **Request Body (Optional):**

```json
{
  "amount": 600
}
```

**Response:**

- **200 OK:** Refund processed successfully.
- **400 Bad Request:** Refund failed or invalid request.
- **401 Unauthorized:** User is not authenticated.
- **404 Not Found:** Payment with the specified ID not found.
