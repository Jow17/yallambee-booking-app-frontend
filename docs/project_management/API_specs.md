# API Specifications

## 1. Users

### Endpoint: `/users`

- **Method:** POST
- **Description:** Register a new user.
- **Request Body:**

```json
{
  "email": "string",
  "password": "string",
  "firstName": "string",
  "lastName": "string",
  "phone": "string",
  "dob": "string (ISO 8601 date)"
}
```

**Response:**

- **201 Created:** User registered successfully.
- **400 Bad Request:** Missing fields or email already taken.

### Endpoint: `/login`

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

### Endpoint: `/users/:id`

- **Method:** GET
- **Description:** Retrieve the logged-in user’s profile.
- **Headers:** Authorization: Bearer `<jwt-token-string>`

**Response:**

- **200 OK:** Returns user profile data.

```json
{
  "_id": "string",
  "username": "string",
  "email": "string",
  "firstName": "string",
  "lastName": "string",
  "phone": "string",
  "dob": "string (ISO 8601 date)",
  "isAdmin": "boolean"
}
```

- **401 Unauthorized:** Invalid or expired token.

### Endpoint: `/users/:id`

- **Method:** PUT
- **Description:** Update the logged-in user’s profile.
- **Headers:** Authorization: Bearer `<jwt-token-string>`
- **Request Body:**

```json
{
  "firstName": "string",
  "lastName": "string",
  "phone": "string",
  "dob": "string (ISO 8601 date)"
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

```json
{
  "message": "User updated successfully",
  "user": {
    "_id": "string",
    "username": "string",
    "email": "string",
    "firstName": "string",
    "lastName": "string",
    "phone": "string",
    "dob": "string (ISO 8601 date)",
    "isAdmin": "boolean"
  }
}
```

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
  "name": "NEW property",
  "description": "A beautiful off-grid tiny home surrounded by nature, perfect for a peaceful getaway.",
  "price": 150,
  "availability": [
    "2024-08-15T00:00:00Z",
    "2024-08-16T00:00:00Z",
    "2024-08-17T00:00:00Z"
  ],
  "images": [
    "https://example.com/images/yallambee1.jpg",
    "https://example.com/images/yallambee2.jpg"
  ],
  "location": {
    "city": "Golspie",
    "state": "NSW"
  },
  "ageRestriction": 18
}
```

**Response:**

- **201 Created:** Property created successfully.

```json
{
	"name": "NEW property",
	"description": "A beautiful off-grid tiny home surrounded by nature, perfect for a peaceful getaway.",
	"price": 150,
	"availability": [
		"2024-08-15T00:00:00.000Z",
		"2024-08-16T00:00:00.000Z",
		"2024-08-17T00:00:00.000Z"
	],
	"images": [
		"https://example.com/images/yallambee1.jpg",
		"https://example.com/images/yallambee2.jpg"
	],
	"location": {
		"city": "Golspie",
		"state": "NSW"
	},
	"ageRestriction": 18,
	"_id": "66cab11ca125ac91341e1990",
	"createdAt": "2024-08-25T04:20:44.396Z",
	"__v": 0
}
```

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

- **Method:** DELETE
- **Description:** Cancel an existing booking.
- **Headers:** Authorization: Bearer `<jwt-token-string>`
- **Path Parameters:**
  - **id:** The ID of the booking to cancel.

**Response:**

- **200 OK:** Booking cancelled successfully.
- **401 Unauthorized:** User is not authenticated or lacks permission.
- **404 Not Found:** Booking with the specified ID not found.

### Endpoint: `/users/:id/bookings`

- **Method:** GET
- **Description:** Retrieves all bookings made by a specific user.
- **Headers:** Authorization: Bearer `<jwt-token-string>`
- **Path Parameters:**
  - **id:** The unique identifier of the user.

**Response:**

- **200 OK:** Booking updated successfully.

```json
[
  {
    "_id": "string",
    "property": "string (Property ID)",
    "startDate": "string (ISO 8601 date)",
    "endDate": "string (ISO 8601 date)",
    "status": "string"
  }
]
```

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

