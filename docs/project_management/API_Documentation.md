# Tiny Home Booking API Documentation

The Tiny Home Booking Platform API provides access to manage users, properties and bookings. The API is built using RESTful principles and requires authentication for most operations.

**Authentication**
This API uses JSON Web Tokens (JWT) for authentication. To access protected routes, include the token in the ‘Authorization’ header.

## Authentication

This API uses JSON Web Tokens (JWT) for authentication. To access protected routes, include the token in the ‘Authorization’ header.

**Obtaining a JWT Token**
To access protected routes within the Tiny Home Accommodation Booking Platform, users must authenticate themselves by obtaining a JSON Web Token (JWT). The token is issued upon successful login or user creation and must be included in the Authorization header of subsequent API requests.

**Login Endpoint for JWT Token**
  `POST /login`
   Authenticates a user and issues a JWT token if the credentials are valid.

   **Request**
   The login request requires the user's email and password.

   **Sample Body**
     Content Type: application/json
     { "email": "user@example.com", 
       "password": "userpassword"
     }

   **Response**
   On successful authentication, the server responds with a JWT token, user information,      and a success message.

   **Sample Response**
   {
  "success": true,
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYxZjRlZjI3NzJhNjEyNmY3YmY2YjEzZiIsImlhdCI6MTYyOTk5MzYwNSwiZXhwIjoxNjMwMDAzNjA1fQ.4YzJWi3a0MR7fA8ezKfISZ-t0kZWB_zXw0kIx06Szn4",
  "user": {
    "id": "61f4ef2772a6126f7bf6b13f",
    "name": "John Doe",
    "email": "user@example.com",
    "role": "user"
  },
  "message": "Login successful"
}

**User Creation Endpoint for JWT Token**
  `POST /login`
  Reegisters a new user and automatically logs them in by issuing a JWT token upon successful account creation.
  
  **Request**
  The registration request requires the user's details, such as email, password, first name, last name, phone, and optional date of birth.

  **Sample Body**
  Content Type: application/json
  {
  "email": "newuser@example.com",
  "password": "newuserpassword",
  "firstName": "Jane",
  "lastName": "Doe",
  "phone": "+1234567890",
  "dob": "1990-01-01"
}

**Response**
On successful registration, the server responds with a JWT token, user information, and a success message.

**Sample Response**
{
  "success": true,
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYxZjRlZjI3NzJhNjEyNmY3YmY2YjEzZiIsImlhdCI6MTYyOTk5MzYwNSwiZXhwIjoxNjMwMDAzNjA1fQ.4YzJWi3a0MR7fA8ezKfISZ-t0kZWB_zXw0kIx06Szn4",
  "user": {
    "id": "61f4ef2772a6126f7bf6b13f",
    "name": "Jane Doe",
    "email": "<newuser@example.com>",
    "role": "user"
  },
  "message": "User created successfully"
}

## User Endpoints

All endpoints related to users.

## User Base URL

 `/users`

## Authentication

**JWT Token**
  All routes except for POST /users and POST /login require a JWT token for authentication.  
**Protect Middleware**
  Ensures the user is authenticated using JWT token  
**AuthoriseUser(‘admin’) Middleware**  
  Ensures the user has the appropriate role (admin) to access specific routes.

## Error Handling

**400 Bad Request**  
  Returned when there are validation errors or missing required fields.  
**401 Unauthorised**  
  Returned when a user tries to access a protected route without a valid JWT token.  
**403 Forbidden**  
  Returned when a user does not have the appropriate permissions to access a route**.**  
**404 Not Found**
  Returned when a resource (user) is not found.  
**500 Internal Server Error**
  Returned when there is a server-side error.

### User Routes Overview

1. **GET /users** - Retrieve all users  
2. **GET /users/:id**  - Retrieve a single user by ID  
3. **POST /users** - Create a new user
4. **PUT /users/:id**  - Update a user by ID
5. **DELETE /user**  - Delete a user

## 1. Get all Users

**Endpoint**
  `GET /users`  
**Description**  
  Retrieves a list of all users. Only accessible by admins.  
**Headers**  
  Authorization: Bearer \<JWT token\>
**Response**  
  **200 OK**
  Returns an array of users.  
  **500 Internal Server Error**  
  If there was an issue retrieving users.  

**Sample Response**
  \[  
    {  
      "\_id": "60c72b1f9b1d8c4a5e6d7f5a",  
      "email": "<user@example.com>",  
      "username": "user1",  
      "firstName": "John",  
      "lastName": "Doe",  
      "phone": "123456789",  
      "dob": "1990-01-01T00:00:00.000Z",  
      "isAdmin": false  
    }  
  \]

## 2. Get User by ID

**Endpoint**
  `GET /users/ :id`  
**Description**  
  Retrieves a single user by their ID. Accessible by authenticated users  
**Headers**  
  Authorization: Bearer \<JWT token\>  

**Response**  
  **200 OK**
  Returns an array of users.  
  **404 Not Found**
  If the user with the specified ID does not exist
  **500 Internal Server Error**  
  If there was an issue retrieving users.  

**Sample Response**  
  {  
    "\_id": "60c72b1f9b1d8c4a5e6d7f5a",  
    "email": "<user@example.com>",  
    "username": "user1",  
    "firstName": "John",  
    "lastName": "Doe",  
    "phone": "123456789",  
    "dob": "1990-01-01T00:00:00.000Z",  
    "isAdmin": false  
  }  

## 3. Create a User

**Endpoint**
  `POST /users`  
**Description**  
  Creates a new user  
**Request Body**  
  `email (String)` - Required. Must be a valid email address.  
  `username (String)` - Required. Must be at least 3 characters long.  
  `password (String)` - Required. Must be at least 6 characters long.  
  `firstName (String)` - Optional.  
  `lastName (String)` - Optional.  
  `phone (String)` - Optional.  
  `dob (Date)` - Optional. Must be a valid date.  
  `isAdmin (Boolean)` - Optional. Defaults to false.  

**Response**  
  **201 Created**
  User created successfully  
  **400 Bad Request**
  Validation errors or email already registered
  **500 Internal Server Error**  
  If there was an issue retrieving users.  

**Sample Response**  
  {
  "success": true,
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYxZjRlZjI3NzJhNjEyNmY3YmY2YjEzZiIsImlhdCI6MTYyOTk5MzYwNSwiZXhwIjoxNjMwMDAzNjA1fQ.4YzJWi3a0MR7fA8ezKfISZ-t0kZWB_zXw0kIx06Szn4",
  "user": {
    "id": "61f4ef2772a6126f7bf6b13f",
    "name": "Jane Doe",
    "email": "<newuser@example.com>",
    "role": "user"
  },
  "message": "User created successfully"
}

## 4. Update a user by ID

**Endpoint**
  `PUT /users/ :id`  

**Description**  
  Updates a user by their ID

**Headers**  
  Authorization: Bearer \<JWT token\>  

**Parameters**  
  `Id (string)` - The ID of the user to be updated

**Request Body**  
  `email (String)` - Required. Must be a valid email address.  
  `username (String)` - Required. Must be at least 3 characters long.  
  `password (String)` - Required. Must be at least 6 characters long.  
  `firstName (String)` - Optional.  
  `lastName (String)` - Optional.  
  `phone (String)` - Optional.  
  `dob (Date)` - Optional. Must be a valid date.  
  `isAdmin` (Boolean) - Optional. Defaults to false.  

**Response**  
  **200 OK**
  User updated successfully  
  **400 Bad Request**
  Validation errors or email registered
  **404 Not Found**
  If the user with the specified ID does not exist
  **500 Internal Server Error**  
  If there was an issue retrieving users.

**Sample Response**  
  {  
    "message": "User updated successfully",  
    "user": {  
      "\_id": "60c72b1f9b1d8c4a5e6d7f5a",  
      "email": "<user@example.com>",  
      "username": "user1",  
      "firstName": "John",  
      "lastName": "Doe",  
      "phone": "123456789",  
      "dob": "1990-01-01T00:00:00.000Z",  
      "isAdmin": false  
    }  
  }

## 5. Delete a User

**Endpoint**
  `DELETE  /users/ :id`  
**Description**  
  Deletes a user by their ID  
**Headers**  
  Authorization: Bearer \<JWT token\>  
**Parameters**  
  `Id (string)` - The ID of the user to be deleted  

**Response**  
  **204 No Content**
  User deleted successfully  
  **404 Not Found**
  If the user with the specified ID does not exist
  **500 Internal Server Error**  
  If there was an issue retrieving users.

## 6. Login User

**Endpoint**
  `POST /login`  
**Description**  
  Authenticates a user and returns a JWT token.  
**Request Body**  
   `email (String)` - Required. Must be a valid email address.  
   `password (String)` - Required. Must be at least 6 characters long.  

**Response**  
  **200 OK**
  User updated successfully  
  **400 Bad Request**
  Validation errors or email registered
  **404 Not Found**
  If the user with the specified ID does not exist
  **500 Internal Server Error**  
  If there was an issue retrieving users.  

**Sample Response**  
  {  
    "message": "Login successful",  
    "token": "jwt\_token\_here"  
  }  
  
## Property Endpoints 

All endpoints related to properties

## Property Base URL

`/properties`

## Authentication

**JWT Token**
  Required for create, update and delete operations.  
**Protect Middleware**
  Ensures the user is authenticated using JWT token  
**AuthoriseUser(‘admin’) Middleware**  
  Ensures the user has the appropriate role (admin) to access specific routes.

### Routes Overview

1. **GET /properties** - Retrieve all properties  
2. **GET /properties/:id**  - Retrieve a single property by ID  
3. **POST /properties** - Create a new property (Admin only)  
4. **PUT /properties/:id**  - Update a property by ID(Adminonly)  
5. **DELETE /properties/:id**  - Delete a property by ID (Admin only)

## 1. Get Properties

**Endpoint**
  `GET /properties`  

**Description**  
  Retrieves all properties from the database  

**Response**  
  **200 OK**
  Successfully retrieves all properties
  **500 Internal Server Error**  
  If there was an issue retrieving users.

**Sample Response**  
  \[  
    {  
      "\_id": "64eaebf8d1a7b3e56c7ec2e5",  
      "name": "Seaside Cottage",  
      "location": "Coastal Road, Seaview",  
      "price": 250,  
      "description": "A cosy seaside cottage with stunning ocean views.",  
      ...  
    },  
    ...  
  \]

## 2. Get Property by ID

**Endpoint**
  `GET properties/ :id`  

**Description**  
  Retrieves a single property by the ID from the database  

**Parameters**  
  `Id (string)` \- The ID of the property to be retrieved  

**Response**  
  **200 OK**
  Successfully retrieved the property by the ID
  **404 Not Found**
   If the property with the specified ID does not exist
   **500 Internal Server Error**  
  If there was an issue retrieving users.

**Sample Response**  
  {  
    "\_id": "64eaebf8d1a7b3e56c7ec2e5",  
    "name": "Seaside Cottage",  
    "location": "Coastal Road, Seaview",  
    "price": 250,  
    "description": "A cosy seaside cottage with stunning ocean views.",  
    ...  
  }

## 3. Create a Property

**Endpoint** 
`POST /properties`

**Description**  
Creates a new property. This operation is restricted to admin users.

**Request Body**
`name` (String) - Required. Name of the property.  
`location` (String) - Required. Address or location of the property.  
`price` (Number) - Required. Price per night.  
`description` (String) - Optional. Detailed description of the property.  
`features` (Array of Strings) - Optional. List of features (e.g., Wi-Fi, pool).  
`images` (Array of Strings) - Optional. List of image URLs.

**Response**  
**201 Created**  
Property created successfully.  
**400 Bad Request**  
Validation errors or missing required fields.  
**500 Internal Server Error**  
If there was an issue creating the property.

**Sample Response**  
{  
"message": "Property created successfully",  
"property": {  
"\_id": "64eaebf8d1a7b3e56c7ec2e5",  
"name": "Seaside Cottage",  
"location": "Coastal Road, Seaview",  
"price": 250,  
"description": "A cosy seaside cottage with stunning ocean views.",  
"features": \["Wi-Fi", "Pool"\],  
"images": \["image1.jpg", "image2.jpg"\]  
}  
}

## 4. Update a Property

**Endpoint** 
`PUT /properties/:id`

**Description**  
Updates a property by its ID. This operation is restricted to admin users.

**Request Body**
`name` (String) - Optional. Updated name of the property.  
`location` (String) - Optional. Updated location of the property.  
`price` (Number) - Optional. Updated price per night.  
`description` (String) - Optional. Updated description of the property.  
`features` (Array of Strings) - Optional. Updated list of features.  
`images` (Array of Strings) - Optional. Updated list of image URLs.

**Response**  
  **200 OK**  
  Property updated successfully.  
  **400 Bad Request**  
  Validation errors or missing required fields.  
  **404 Not Found**  
  If the property with the specified ID does not exist.  
  **500 Internal Server Error**  
  If there was an issue updating the property.

**Sample Response**  
{  
"message": "Property updated successfully",  
"property": {  
"\_id": "64eaebf8d1a7b3e56c7ec2e5",  
"name": "Updated Seaside Cottage",  
"location": "Updated Coastal Road, Seaview",  
"price": 300,  
"description": "An updated description.",  
"features": \["Wi-Fi", "Pool", "Parking"\],  
"images": \["updated\_image1.jpg"\]  
}  
}

## 5. Delete a Property

**Endpoint**
 `DELETE /properties/:id`

**Description**  
Deletes a property by its ID. This operation is restricted to admin users.

**Response**  
  **204 No Content**  
  Property deleted successfully.  
  **404 Not Found**  
  If the property with the specified ID does not exist.  
  **500 Internal Server Error**  
  If there was an issue deleting the property.

## Booking Endpoints

All endpoints related to bookings.

## Booking Base URL

`/bookings`

## Booking Authentication

**JWT Token**  
  Required for all operations except `GET /bookings`.  
**Protect Middleware**  
  Ensures the user is authenticated using JWT token  
**AuthoriseUser(‘admin’) Middleware**  
  Ensures the user has the appropriate role (admin) to access specific routes.

## Booking Routes Overview

1. **GET /bookings** - Retrieve all bookings (Admin only)  
2. **GET /bookings/:id**  - Retrieve a single booking by ID (Authenticated users)  
3. **POST /bookings** - Create a new booking (Authenticated users)  
4. **PUT /bookings/:id**  - Update a booking by ID (Authenticated users)  
5. **DELETE /bookings/**  - Delete a booking by ID (Admin only)

## 1. Get All Bookings

**Endpoint**  
`GET /bookings`

**Description**  
Retrieves a list of all bookings. Accessible only by admin users.

**Headers**  
Authorization: Bearer \<JWT token\>

**Response**  
  **200 OK**  
  Returns an array of bookings.
  **500 Internal Server Error**  
  If there was an issue retrieving bookings.
**Sample Response**
\[

  {
    "\_id": "64eaebf8d1a7b3e56c7ec2e5",
    "property": "64eaebf8d1a7b3e56c7ec2e6",
    "user": "60c72b1f9b1d8c4a5e6d7f5a",
    "startDate": "2024-08-01T00:00:00.000Z",
    "endDate": "2024-08-10T00:00:00.000Z",
    "status": "Confirmed"
  },
  ...
\]

## 2. Get Booking by ID

**Endpoint**  
`GET /bookings/:id`

**Description**  
Retrieves a single booking by its ID. Accessible by authenticated users.

**Headers**  
Authorization: Bearer \<JWT token\>

**Response**  
  **200 OK**  
  Returns the booking with the specified ID.
  **404 Not Found**  
  If the booking with the specified ID does not exist.
  **500 Internal Server Error**  
  If there was an issue retrieving the booking.

**Sample Response**
{
  "\_id": "64eaebf8d1a7b3e56c7ec2e5",
  "property": "64eaebf8d1a7b3e56c7ec2e6",
  "user": "60c72b1f9b1d8c4a5e6d7f5a",
  "startDate": "2024-08-01T00:00:00.000Z",
  "endDate": "2024-08-10T00:00:00.000Z",
  "status": "Confirmed"
}

## 3. Create a Booking**

**Endpoint**  
`POST /bookings`

**Description**  
Creates a new booking. Accessible by authenticated users AND Admins only. Enables Admins to be authenticated and create a booking for other users, linking the userID to the created booking, through the intended booking user's ID, passed into the request body.

**Request Body**
`property` (String) - Required. The ID of the property being booked.  
`startDate` (Date) - Required. The start date of the booking.  
`endDate` (Date) - Required. The end date of the booking.  
`id` (String) - Required. The userID, of the intended booking creation.
`status` (String) - Required. Booking status. Must be one of `['Pending', 'Confirmed', 'Cancelled']`.

**Headers**  
Authorization: Bearer \<JWT token\>

**Response**  
  **201 Created**  
  Booking created successfully.
  **400 Bad Request**  
  Validation errors or missing required fields.
  **500 Internal Server Error**  
  If there was an issue creating the booking.
**Sample Response**
{
  "message": "Booking created successfully",
  "booking": {
    "\_id": "64eaebf8d1a7b3e56c7ec2e5",
    "property": "64eaebf8d1a7b3e56c7ec2e6",
    "user": "60c72b1f9b1d8c4a5e6d7f5a",
    "startDate": "2024-08-01T00:00:00.000Z",
    "endDate": "2024-08-10T00:00:00.000Z",
    "status": "Confirmed"
  }
}

## 4. Update a Booking

**Endpoint**  
`PUT /bookings/:id`

**Description**  
Updates an existing booking by its ID. Accessible by authenticated users.

**Request Body**
`property` (String) - Optional. The ID of the property being booked.  
`startDate` (Date) - Optional. The start date of the booking.  
`endDate` (Date) - Optional. The end date of the booking.  
`status` (String) - Optional. Booking status. Must be one of `['Pending', 'Confirmed', 'Cancelled']`.

**Headers**  
Authorization: Bearer \<JWT token\>

**Response**  
  **200 OK**  
  Booking updated successfully.
  **400 Bad Request**  
  Validation errors or missing required fields.
  **404 Not Found**  
  If the booking with the specified ID does not exist.
  **500 Internal Server Error**  
  If there was an issue updating the booking.

**Sample Response**
{
  "message": "Booking updated successfully",
  "booking": {
    "\_id": "64eaebf8d1a7b3e56c7ec2e5",
    "property": "64eaebf8d1a7b3e56c7ec2e6",
    "user": "60c72b1f9b1d8c4a5e6d7f5a",
    "startDate": "2024-08-01T00:00:00.000Z",
    "endDate": "2024-08-12T00:00:00.000Z",
    "status": "Confirmed"
  }
}

## 5. Delete a Booking

**Endpoint**  
`DELETE /bookings/:id`

**Description**  
Deletes a booking by its ID. Accessible only by admin users.

**Headers**  
Authorization: Bearer \<JWT token\>

**Response**  
  **204 No Content**  
  Booking deleted successfully.
  **404 Not Found**  
  If the booking with the specified ID does not exist.
  **500 Internal Server Error**  
  If there was an issue deleting the booking.

## Upload Route Overview

1. **POST /upload** - This endpoint allows users to upload a file to the server. This is typically used for uploading images, documents, or other files.

## 1. Upload

**Endpoint**  
`POST /upload`

**Description**  
This endpoint allows users to upload a file to the server. This is typically used for uploading images, documents, or other files.

**Request Body**
`file` (Form) - The file to be uploaded. Must be sent as form-data. 
`name` - Use name `image` for image uploads
`value` - Set `Value` to the image being uploaded

**Headers**  
`Content-Type: multipart/form-data` 

**Response**  
  **200 OK**  
  Booking updated successfully.
  **400 Bad Request**  
  Validation errors or missing required fields.
  **404 Not Found**  
  If the booking with the specified ID does not exist.
  **500 Internal Server Error**  
  If there was an issue updating the booking.
  
  **Error Handling: Permissions Issues with /uploads Directory**
  If your application encounters errors related to permissions when trying to read from or write to the /uploads directory, it typically means that the application does not have the necessary access rights to the directory. This can result in issues where files cannot be uploaded, saved, or accessed as intended.
  **Possible Causes**
  Insufficient Permissions: The user account under which your application is running may not have the required permissions to access or modify the /uploads directory.
  File System Restrictions: The operating system or hosting environment may have restrictions or settings that prevent applications from writing to certain directories.
  
**Sample Response**
{
  "success": true,
  "message": "File uploaded successfully.",
  "file": {
    "filename": "example.jpg",
    "path": "/uploads/example.jpg",
    "size": 12345
  }
}
