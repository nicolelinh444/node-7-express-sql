// ------------------
// IMPORT STATEMENTS
// ------------------

import { useState, useEffect } from "react";
import "./App.css";

// ------------------
// FUNCTION DECLARATION
// ------------------

function App() {
  // ------------------
  // STATE VARIABLES
  // ------------------

  const [animals, setAnimals] = useState(null);

  // ------------------
  // HELPER FUNCTIONS
  // ------------------

  const getAllAnimals = async () => {
    const response = await fetch("/api/get-all-animals");
    const data = await response.json();
    console.log(data);
    setAnimals(data);
  };

  const deleteOneAnimal = async (id) => {
    // Now it's your turn!
    // Send a POST request to the /delete-one-animal endpoint
    // to delete an animal based on the id.
    await fetch(`/api/delete-one-animal/${id}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
    });
  };

  // ------------------
  // EFFECTS
  // ------------------

  useEffect(() => {
    getAllAnimals();
  }, []);

  // ------------------
  // RENDERING JSX TO THE SCREEN
  // ------------------

  return (
    <>
      <h1>🐾 Full-Stack Animals App 🐾</h1>
      <div className="card">
        <h2>All Animals</h2>
        <div className="animals">
          {animals?.map((animal) => (
            <div className="animal" key={animal.id}>
              <h2>{animal.name}</h2>
              <p>Id: {animal.id}</p>
              <p>Category: {animal.category}</p>
              <p>Lives in: {animal.lives_in}</p>
              <p>Can fly: {animal.can_fly ? "True ✅" : "False ❌"}</p>
              <button
                onClick={() => {
                  deleteOneAnimal(animal.id);
                }}
              >
                Delete Animal
              </button>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}

// ------------------
// EXPORT STATEMENT
// ------------------

export default App;
