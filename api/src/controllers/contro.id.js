
const { Diet, Recipe, RecipesDiet } = require("../db");
// const getApiInfo = require("../routes/apiInfo");
const axios = require("axios");

// const specialCharactresTypeRegex = /[0-9@:%._+~#=]/gi;
// const { Op } = require("sequelize");

async function getRecipeById(id, source) {
   
  const recipe =
  source === "api"
  ? await axios.get(`https://api.spoonacular.com/recipes/${id}/information?apiKey=72b26e6292e7418eae7f4cb05fed3a80`)
  : await Recipe.findByPk(id);

  return recipe
}
  
  //Si no recibe un parametro id retorna un error
  //   if (!id) throw new Error("Debe ingresar un id");
  
  //   //cargamos los datos de la api en la db
  //   let data = await getApiInfo();
  //   // asignamos todo lo de la base de datos a la variable data
  //   data = await Recipe.findAll({ include: Diet });
  //   if (!data) throw new Error("Error en la API");
  
  //   //buscamos en la Api una receta que tenga el id que recibimos por parametros
  //   let findRecipe = data.find(recipe => recipe.id === isNaN(id))
  //   // });
  
  //   // //Si ninguna coincide, buscamos en la base de datos
  //   if (!findRecipe) throw new Error("El id ingresado no existe");
  
  //     return findRecipe;
  // }
  
  module.exports= { getRecipeById };
  


