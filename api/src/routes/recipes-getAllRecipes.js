const { Router } = require("express");
const recipesRoutes = Router();
const { Diet, Recipe, RecipesDiet } = require("../db");
const {  searchRecipesInApiAndDB } = require("../controllers/contro.getAllRecipes");



recipesRoutes.get("/getAllRecipes", async (req, res) => {
  try {
    const AllRecipes = await searchRecipesInApiAndDB(Recipe);
    res.status(200).send(AllRecipes);
  } catch (error) {
    res.status(401).send(error.message);
  }
});

module.exports = recipesRoutes;


// const { Router } = require("express");
// const axios = require("axios");
// const { Recipe, Diet } = require("../db");
// const recipesRoutes = Router();

// //---------------------------------GET ALL RECIPES----------------------------// Traigo 100 recetas

// // ("https://run.mocky.io/v3/84b3f19c-7642-4552-b69c-c53742badee5")
// recipesRoutes.get("/getAllRecipes", async (req, res) => { 
//   try {
//     const api = await axios.get(`https://api.spoonacular.com/recipes/complexSearch?apiKey=72b26e6292e7418eae7f4cb05fed3a80&addRecipeInformation=true&number=100`);
// // puedo usar fetch.get("link").then....

// // ingreso a la api para traerme las datos que me interesan 

// const recipes = api.data.results.map(item => {
//   const recipe = {
//     id: item.id,
//     title: item.title,
//     image: item.image,
//     summary: item.summary,
//     healthScore: item.healthScore,
//     dishTypes: item.dishTypes.join(', '),
//     diets: item.diets,
//     steps: item.analyzedInstructions[0]?.steps.map(element => 'Step ' + element.number + ': ' + element.step )
    
//     || "No se encuentran pasos para esta receta.",
//   };
//   return recipe
// })

// const db = await Recipe.findAll({ include: [{ model: Diet }] });


// const suma = [...recipes, ...db]

// res.status(200).json(suma);

//   } catch (error) {
// res.status(400).send({error: error.message})
//   }

// });

 
//  module.exports = recipesRoutes;
