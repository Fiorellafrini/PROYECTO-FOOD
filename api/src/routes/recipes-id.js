

const { Router } = require("express");
const recipesGetId = Router();
const { getRecipeById } = require("../controllers/contro.id");


//Buscar receta por id
recipesGetId.get("/recipes/:id", async (req, res) => {
  const { id } = req.params;
  const source = isNaN(id) ? "db" : "api"
   
  try {
      const recipe = await getRecipeById(id, source);
      res.status(200).json(recipe);
    } catch (error) {
      res.status(400).send(error.message);
    }
  });
  


  module.exports = recipesGetId;



  