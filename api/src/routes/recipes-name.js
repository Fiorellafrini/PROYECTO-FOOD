const { Router } = require("express");
const recipesGetName = Router();
const { Diet, Recipe, RecipesDiet } = require("../db");
const { searchByName } = require("../controllers/contro.name");



  //buscamos una receta por nombre
  recipesGetName.get("/recipes", async (req, res) => {
    try {
      const { name } = req.query;
      const recipe = await searchByName(name);
      res.status(200).json(recipe);
    } catch (error) {
      res.status(400).send(error.message);
    }
  });

  module.exports=recipesGetName