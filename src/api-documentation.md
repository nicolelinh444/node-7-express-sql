# 📘 Animals API Documentation

Base URL: `http://localhost:3000`

## Overview

| Resource  | Method | Endpoint                 | Description                                 |
| --------- | ------ | ------------------------ | ------------------------------------------- |
| `animals` | GET    | /get-all-animals         | Retrieves all animals from the database.    |
| `animals` | GET    | /get-one-animal-by-name/:name    | Retrieves one animal by its name.           |
| `animals` | GET    | /get-one-animal-by-id/:id    | Retrieves one animal by its id number.           |
| `animals` | GET    | /get-newest-animal       | Retrieves the most recently added animal.   |
| `animals` | POST   | /delete-one-animal/:id | Deletes one animal by its id number.             |
| `animals` | POST   | /add-one-animal          | Adds a new animal to the database.          |
| `animals` | POST   | /update-one-animal-name       | Updates the name of an existing animal in the database. |
| `animals` | POST   | /update-one-animal-category       | Updates the category of an existing animal in the database. |

---

## Database Schema

The `animals` SQL table was created with the following structure:

```sql
CREATE TABLE animals (
  id SERIAL PRIMARY KEY,      
  name TEXT UNIQUE NOT NULL,
  category TEXT NOT NULL,
  can_fly BOOLEAN NOT NULL,
  lives_in TEXT NOT NULL
);
```

The table was seeded with sample data: 
```sql
INSERT INTO animals (name, category, can_fly, lives_in) VALUES
('Lion', 'mammal', false, 'land'),
('Eagle', 'bird', true, 'air'),
('Dolphin', 'mammal', false, 'water'),
('Bat', 'mammal', true, 'air'),
('Frog', 'amphibian', false, 'land'),
('Shark', 'fish', false, 'water'),
('Elephant', 'mammal', false, 'land'),
('Butterfly', 'insect', true, 'air'),
('Penguin', 'bird', false, 'land'),
('Crocodile', 'reptile', false, 'water');
```

---

## Animals

### 🔹 GET `/get-all-animals`

**Description:** Retrieves all animals stored in the database.

**Example Request URL:**
`GET http://localhost:3000/get-all-animals`

**Example Response:**

```json
[
   {
    "id": 1,
    "name": "Lion",
    "category": "mammal",
    "can_fly": false,
    "lives_in": "land"
  },
  {
    "id": 2,
    "name": "Eagle",
    "category": "bird",
    "can_fly": true,
    "lives_in": "air"
  },
  {
    "id": 3,
    "name": "Dolphin",
    "category": "mammal",
    "can_fly": false,
    "lives_in": "water"
  }
]
```

---

### 🔹 GET `/get-one-animal-by-name/:name`

**Description:** Retrieves one animal by its name.

**Example Request URL:**
`GET http://localhost:3000/get-one-animal-by-name/Eagle`

**Example Response:**

```json
{
  "id": 2,
  "name": "Eagle",
  "category": "bird",
  "can_fly": true,
  "lives_in": "air"
}
```

---

### 🔹 GET `/get-one-animal-by-id/:id`

**Description:** Retrieves one animal by its id number.

**Example Request URL:**
`GET http://localhost:3000/get-one-animal-by-id/4`

**Example Response:**

```json
{
  "id": 4,
  "name": "Frog",
  "category": "amphibian",
  "can_fly": false,
  "lives_in": "land"
}
```

---

### 🔹 GET `/get-newest-animal`

**Description:** Retrieves the most recently added animal.

**Example Request URL:**
`GET http://localhost:3000/get-newest-animal`

**Example Response:**

```json
{
  "id": 10,
  "name": "Crocodile",
  "category": "reptile",
  "can_fly": false,
  "lives_in": "water"
}
```

---

### 🔹 POST `/delete-one-animal/:name`

**Description:** Deletes one animal by its name.

**Example Request URL:**
`GET http://localhost:3000/delete-one-animal/Eagle`

**Example Response:**

```
Success! Eagle was deleted!
```

---

### 🔹 POST `/add-one-animal`

**Description:** Adds a new animal to the database.

**Example Request URL:**
`POST http://localhost:3000/add-one-animal`

**Example Request Body:**

```json
{
  "name": "Tiger",
  "category": "mammal",
  "can_fly": false,
  "lives_in": "Jungle"
}
```

**Example Response:**

```
Success! Tiger was added!
```

---

### 🔹 POST `/update-one-animal-name`

**Description:** Updates the name of an existing animal in the database using its `id`. 

**Example Request URL:**
`POST http://localhost:3000/update-one-animal-name`

**Example Request Body:**

```json
{
  "id": 4,
  "newName": "Unicorn"
}
```

**Example Response:**

```
Success! The animal's name was updated! 
```

---

### 🔹 POST `/update-one-animal-category`

**Description:** Updates the category of an existing animal in the database using its `id`. 

**Example Request URL:**
`POST http://localhost:3000/update-one-animal-category`

**Example Request Body:**

```json
{
  "id": 4,
  "newCategory": "fish"
}
```

**Example Response:**

```
Success! The animal's category was updated! 
```
