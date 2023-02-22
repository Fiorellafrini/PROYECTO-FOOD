const { Diet, Recipe, RecipesDiet } = require("../db");
const getApiInfo = require("../routes/apiInfo");
const specialCharactresTypeRegex = /[0-9@:%._+~#=]/gi;





async function searchByName(name) {
    //Validamos los datos ingresados en la busqueda
    if (!name)
      throw new Error("Debe ingresar el nombre de la receta que desea buscar");
    if (specialCharactresTypeRegex.test(name)) {
      throw new Error("Debes ingresar un nombre valido para la receta.");
    }
    // Guardamos los datos de la API en data
    const data = await getApiInfo();
  
    //Si no recibe info de las recetas devuelve un error
    if (!data) throw new Error("Error en la API");
  
    //buscamos en la Api una receta que tenga el name que recibimos por parametros
    let findRecipe = data.filter((recipe) =>
      recipe.name.toLowerCase().includes(name.toLowerCase()),
    );
  
    //Si ninguna coincide, buscamos en la base de datos
    if (!findRecipe.length) throw new Error("No se pudo encontrar la receta");
  
    return findRecipe;
  }

  module.exports= { searchByName };