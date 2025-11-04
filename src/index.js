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

// 6. addOneAnimal(name, category, can_fly, lives_in)

// 7. updateOneAnimalName(id, newName)

// 8. updateOneAnimalCategory(id, newCategory)

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

// 6. POST /add-one-animal

// 7. POST /update-one-animal-name

// 8. POST /update-one-animal-category
