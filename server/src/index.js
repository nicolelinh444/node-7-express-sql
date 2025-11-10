// ---------------------------------
// Boilerplate Code to Set Up Server
// ---------------------------------

// importing Node Modules
import express from "express";
import pg from "pg"; // pg stands for PostgreSQL, for connecting to the database
import config from "./config.js"; // importing the connection string to our database hosted on Neon

//connecting to our PostgreSQL database, or db for short
const db = new pg.Pool({
  // new pg.Pool() creates a connection to the database
  connectionString: config.databaseUrl, // credentials to access the database. Keep private!
  ssl: true, // use SSL encryption when connecting to the database to keep data safe
});

const app = express(); // create an instance of the Express module, which gives us access to all of Express's functions, methods, useful superpowers

app.use(express.json()); // This server will receive and respond to requests with JSON data

const port = 3000; // Setting which port to listen or receive requests

app.listen(port, () => {
  console.log(`Server is listening on port ${port}!`);
});

// ---------------------------------
// Helper Functions
// ---------------------------------

// 1. getAllAnimals()

async function getAllAnimals() {
  // db.query() lets us query the SQL database
  // It takes in one parameter: a SQL query!
  const data = await db.query("SELECT * FROM animals ORDER BY id ASC");
  return data.rows; // we have to use dot notation to get value of the rows property from the data object
}

// 2. getOneAnimalByName(name)

async function getOneAnimalByName(name) {
  const data = await db.query("SELECT * FROM animals WHERE name = $1", [name]);
  return data.rows[0];
}

// 3. getOneAnimalById(id)
async function getOneAnimalById(id) {
  const data = await db.query("SELECT * FROM animals WHERE id = $1", [id]);
  return data.rows[0];
}

// 4. getNewestAnimal()
async function getNewestAnimal() {
  const data = await db.query("SELECT * FROM animals ORDER BY id DESC LIMIT 1");
  return data.rows[0];
}

// 5. deleteOneAnimal(id)
async function deleteOneAnimal(id) {
  const deletedAnimal = await db.query(
    "DELETE FROM animals WHERE id = $1 RETURNING *",
    [id]
  );
  return deletedAnimal.rows[0];
}

// 6. addOneAnimal(name, category, can_fly, lives_in)

async function addOneAnimal(name, category, can_fly, lives_in) {
  // we declared db in our boilerplate code, which connects us to the SQL database
  // The db.query() method lets us write SQL code to query the database. Takes in 2 parameters:
  // 1. The SQL command
  // 2. An array that contains dynamic values that we inject into the SQL command
  // the SQL command needs to be written all in one line, using $1 - $4 as placeholders for dynamic values
  await db.query(
    "INSERT INTO animals (name, category, can_fly, lives_in) VALUES ($1, $2, $3, $4)",
    [name, category, can_fly, lives_in]
  );
}

// 7. updateOneAnimalName(id, newName)
async function updateOneAnimalName(id, newName) {
  await db.query("UPDATE animals SET name = $1 WHERE id = $2", [newName, id]);
}

// 8. updateOneAnimalCategory(id, newCategory)
async function updateOneAnimalCategory(id, newCategory) {
  await db.query("UPDATE animals SET category = $1 WHERE id = $2", [
    newCategory,
    id,
  ]);
}

// ---------------------------------
// API Endpoints
// ---------------------------------

// 1. GET /get-all-animals

app.get("/get-all-animals", async (req, res) => {
  const animals = await getAllAnimals();
  res.json(animals);
});

// 2. GET /get-one-animal-by-name/:name

app.get("/get-one-animal-by-name/:name", async (req, res) => {
  let name = req.params.name;
  const animal = await getOneAnimalByName(name);
  res.json(animal);
});

// 3. GET /get-one-animal-by-id/:id
app.get("/get-one-animal-by-id/:id", async (req, res) => {
  const id = req.params.id;
  const animal = await getOneAnimalById(id);
  res.json(animal);
});

// 4. GET /get-newest-animal
app.get("/get-newest-animal", async (req, res) => {
  const animal = await getNewestAnimal();
  res.json(animal);
});

// 5. POST /delete-one-animal/:id
app.post("/delete-one-animal/:id", async (req, res) => {
  const id = req.params.id;
  const deletedAnimal = await deleteOneAnimal(id);

  res.json(deletedAnimal);
});

// 6. POST /add-one-animal

// app.post() takes in two parameters:
//  1. The URL path for the endpoint
//  2. The callback function that gets triggered when we send a request to the endpoint URL
app.post("/add-one-animal", async (req, res) => {
  // we access whatever was sent in the request body and save it in this variable
  const { name, category, can_fly, lives_in } = req.body;

  // calling the helper function
  // we aren't declaring a variable because our helper function doesn't need to return anything
  await addOneAnimal(name, category, can_fly, lives_in);

  // Sending a response as text, so we use res.send() which sends text
  // If we wanted to send a response as JSON data (which would need to be an object or array to be valid JSON), we would use res.json()
  res.send(`Success! Animal was added.`);
});

// 7. POST /update-one-animal-name
app.post("/update-one-animal-name", async (req, res) => {
  const { id, newName } = req.body;

  await updateOneAnimalName(id, newName);

  res.send(`Success! The animal's name was updated.`);
});

app.post("/update-one-animal-name-with-error-handling", async (req, res) => {
  try {
    // Possible errors:
    // DONE: 400 Bad Request: what should we do when there's no body?
    // 500 Internal Server Error: when a unique constraint is violated
    // 404 Resource Not Found: using camelCase for the api endpoint
    // 404 Resource Not Found: no existing animal was found with the given id

    const { id, newName } = req.body;

    // check for missing required fields in the request body: id and newName
    if (!newName || !id) {
      // return error message with 400 Bad Request status code, because the request was badly formed with wrong syntax.
      // All 4xx status codes are client-side errors, which means the client sent a bad request
      return res.status(400).send("Error: Missing required fields");
    }

    await updateOneAnimalName(id, newName);

    res.send(`Success! The animal's name was updated.`);
  } catch (error) {
    res.status(500).send("Internal Server Error");
  }
});

// 8. POST /update-one-animal-category

app.post("/update-one-animal-category", async (req, res) => {
  const { id, newCategory } = req.body;
  await updateOneAnimalCategory(id, newCategory);
  res.send(`Success! The animal's category was updated.`);
});
