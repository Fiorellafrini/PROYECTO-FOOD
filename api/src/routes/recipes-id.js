

const { Router } = require("express");
const recipesGetId = Router();
const { getRecipeById } = require("../controllers/contro.id");


//Buscar receta por id
recipesGetId.get("/recipes/:id", async (req, res) => {
    try {
      const { id } = req.params;
      const recipe = await getRecipeById(id);
      res.status(200).send(recipe);
    } catch (error) {
      res.status(401).send(error.message);
    }
  });
  
  module.exports = recipesGetId;
  