require("dotenv").config();
const { Router } = require("express");
const axios = require("axios");
const { Recipe, Diet } = require("../db");


const getApiInfo = async () => {
// 
  const api = await axios.get("https://run.mocky.io/v3/84b3f19c-7642-4552-b69c-c53742badee5")
  // (`https://api.spoonacular.com/recipes/complexSearch?apiKey=72b26e6292e7418eae7f4cb05fed3a80&addRecipeInformation=true&number=100`)
// puedo usar fetch.get("link").then....

// ingreso a la api para traerme las datos que me interesan 

const recipes = api.data.results.map(item => {
  const recipe = {
    id: item.id,
    name: item.title,
    image: item.image,
    summary: item.summary,
    healthScore: item.healthScore,
    dishTypes: item.dishTypes.join(', '),
    diets: item.diets,
    steps: item.analyzedInstructions[0]?.steps.map(element => 'Step ' + element.number + ': ' + element.step )
    
    || "No se encuentran pasos para esta receta.",
  };
  return recipe
})

const db = await Recipe.findAll({ include: [{ model: Diet }] });

const suma = [...recipes, ...db]
return suma

  }

 
 module.exports = getApiInfo;


// -----ULISES--
//  const axios = require("axios");
// const { Diet, Recipe, RecipesDiet } = require("../db");
// require("dotenv").config();
// const { YOUR_API_KEY, spoonacularURL } = process.env;

// /////////////////////////////////////////////////////
// const getApiInfo = async () => {
//   //Buscamos en la base de datos, si hay contenido en ella significa que ya se cargaron los datos de la api
//   let dbRecipes = await Recipe.findAll({ include: Diet });
//   if (dbRecipes.length) {
//     console.log("vengo de la db sin usar la api");
//     return dbRecipes;
//   }
//   // const searchApi = await axios.get(
//   //   `https://api.spoonacular.com/recipes/complexSearch?apiKey=72b26e6292e7418eae7f4cb05fed3a80&addRecipeInformation=true&number=100`,
//   //   {
//   //     headers: { Accept: "application/json", "Accept-Encoding": "identity" },
//   //     params: { trophies: true },
//   //   },
//   // );

//   const searchApi = await axios.get(
//     `https://run.mocky.io/v3/84b3f19c-7642-4552-b69c-c53742badee5`,
//   );

//   // Mapeamos toda la info que nos trae la api y nos quedamos solo
//   // con lo que nos interesa
//   const mappedApi = await searchApi.data.results.map((recipe) => {
//     return {
//       id: recipe.id,
//       name: recipe.title,
//       image: recipe.image,
//       dishTypes: recipe.dishTypes.join(", "),
//       diets: recipe.diets.map((diet) => diet),
//       summary: recipe.summary,
//       healthScore: recipe.healthScore,
//       steps:
//         recipe.analyzedInstructions[0]?.steps
//           .map((step) => {
//             return `${step.number} - ${step.step} \n`;
//           })
//           .join(`\n`) || "Aún no tenemos los pasos para esta receta.",
//     };
//   });

//   //Traemos (o creamos) todas las dietas desde nuestra base de datos
//   const AllDiets = await axios.get(`http://localhost:3001/diets`);

//   // creamos cada receta que traemos de nuestra API a nuestra DB
//   for (let recipe of mappedApi) {
//     const [instance, created] = await Recipe.findOrCreate({
//       where: {
//         name: recipe.name,
//         image: recipe.image,
//         dishTypes: recipe.dishTypes,
//         summary: recipe.summary,
//         healthScore: recipe.healthScore,
//         steps: recipe.steps,
//       },
//     });

//     // Api diets irá tomando el valor de las dietas que trae cada receta de la api
//     let apiDiets = recipe.diets;

//     //Mapeamos ese array de dietas y lo comparamos con las de nuestra db
//     // Cuando los valores coinciden, agregamos esas dietas a la receta que acabamos de crear
//     apiDiets.map((dietAPI) => {
//       for (let dietDB of AllDiets.data) {
//         if (dietAPI === dietDB.name) {
//           instance.addDiet(dietDB.id);
//         }
//       }
//     });
//   }
//   dbRecipes = await Recipe.findAll({ include: Diet });

//   console.log("hicimos una peticion a la api");
//   return dbRecipes;
// };


// module.exports =  getApiInfo ;