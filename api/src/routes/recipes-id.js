

const { Router } = require("express");
const recipesGetId = Router();
const { getRecipeById } = require("../controllers/contro.id");


//Buscar receta por id
recipesGetId.get("/recipes/:id", async (req, res) => {
  const { id } = req.params;
   
  try {
      const recipe = await getRecipeById(id);
      res.status(200).json(recipe);
    } catch (error) {
      res.status(400).json({error: error.message});
    }
  });
  


  module.exports = recipesGetId;



  