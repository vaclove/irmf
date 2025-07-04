# API Documentation

This document outlines the available API endpoints for the Guest Management System.

## Guests API

### Get all guests

- **URL:** `/guests`
- **Method:** `GET`
- **Description:** Retrieves a list of all registered guests.
- **Response:**
  ```json
  [
    {
      "id": 1,
      "name": "John",
      "surname": "Doe",
      "email": "john.doe@example.com",
      "phone": "123-456-7890",
      "company": "Example Corp",
      "note": "This is a sample note.",
      "language": "english",
      "createdAt": "2025-07-04T...",
      "updatedAt": "2025-07-04T...",
      "lastInvitation": {
        "year": 2025,
        "status": "pending",
        "category": "VIP"
      }
    }
  ]
  ```

### Create a new guest

- **URL:** `/guests`
- **Method:** `POST`
- **Description:** Creates a new guest entry in the system.
- **Request Body (JSON):**
  ```json
  {
    "name": "Jane",
    "surname": "Doe",
    "email": "jane.doe@example.com",
    "phone": "123-456-7890",
    "company": "Example Corp",
    "note": "This is a custom note for Jane Doe.",
    "language": "english"
  }
  ```
- **Response:**
  ```json
  {
    "id": 1,
    "name": "Jane",
    "surname": "Doe",
    "email": "jane.doe@example.com",
    "phone": "123-456-7890",
    "company": "Example Corp",
    "note": "This is a custom note for Jane Doe.",
    "language": "english",
    "createdAt": "2025-07-04T...",
    "updatedAt": "2025-07-04T..."
  }
  ```

## Editions API

### Get all editions

- **URL:** `/editions`
- **Method:** `GET`
- **Description:** Retrieves a list of all available editions (e.g., years of an event).
- **Response:**
  ```json
  [
    {
      "id": 1,
      "year": 2025,
      "createdAt": "2025-07-04T...",
      "updatedAt": "2025-07-04T..."
    }
  ]
  ```

### Create a new edition

- **URL:** `/editions`
- **Method:** `POST`
- **Description:** Creates a new edition entry.
- **Request Body (JSON):**
  ```json
  {
    "year": 2025
  }
  ```
- **Response:**
  ```json
  {
    "id": 1,
    "year": 2025,
    "createdAt": "2025-07-04T...",
    "updatedAt": "2025-07-04T..."
  }
  ```

## Invitations API

### Assign a guest to an edition and send invitation

- **URL:** `/invitations/assign`
- **Method:** `POST`
- **Description:** Assigns a guest to a specific edition and sends an invitation email.
- **Request Body (JSON):**
  ```json
  {
    "guestId": 1,
    "editionId": 1,
    "category": "VIP"
  }
  ```
- **Response:**
  ```json
  {
    "message": "Invitation sent successfully"
  }
  ```
- **Error Response (404):**
  ```json
  {
    "message": "Guest or Edition not found"
  }
  ```

### Confirm an invitation

- **URL:** `/invitations/confirm/:guestId/:editionId`
- **Method:** `GET`
- **Description:** Confirms a guest's invitation for a specific edition.
- **URL Parameters:**
    - `guestId`: The ID of the guest.
    - `editionId`: The ID of the edition.
- **Response (200 OK):**
  ```
  Thank you for confirming your attendance!
  ```
- **Error Response (404 Not Found):**
  ```
  Invitation not found
  ```
