const { Diet, Recipe, RecipesDiet } = require("../db");
// const searchRecipesInApiAndDB = require("../routes/recipes-getAllRecipes")
const { Router } = require("express");





/// <=============== controller getAllRecipes ===============>
async function searchRecipesInApiAndDB() {
  // Guardamos los datos de la API en data
  let data = await getApiInfo();
  //Si la funcion no recibe nada, devuelve un error.
  if (!Recipe) throw new Error("No hay recetas");
  return data;
}


module.exports= {searchRecipesInApiAndDB}