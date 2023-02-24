const { Recipe } = require("../db");
const createRecipes = require("../routes/recipes-post")



async function createRecipes(
  name,
  image,
  summary,
  healthScore,
  steps,
  dishTypes,
  dietId,
) {
  //Comprobamos que solo se puedan añadir dietas con los valores correctos
  const AllDiets = await getDiets();
  for (const id of dietId) {
    if (id < 1 || id > AllDiets.length)
      throw new Error("El id de la dieta tiene un valor incorrecto");
  }

  // comprobamos si hay recetas repetidas
  for (let i = 0; i < dietId.length; i++) {
    for (let j = i + 1; j < dietId.length; j++) {
      if (dietId[i] === dietId[j]) throw new Error("Existen dietas repetidas");
    }
  }

  //Si falta algun dato devolvemos un error
  if (
    !name ||
    !image ||
    !summary ||
    !healthScore ||
    !steps ||
    !dietId ||
    !dishTypes
  )
    throw new Error("Faltan datos para crear la receta");
  // console.log(name, image, summary, healthScore, steps, dishTypes, dietId)
  //comprobamos que la tabla de dietas tenga información precargada
  //Si no existe info en la tabla la creamos
  const dietExist = getDiets();
  if (!dietExist) getDiets();

  //Llamamos a la función getApiInfo()
  //para comprobar si la receta ya existe
  // Guardamos los datos de la API en data
  const data = await getApiInfo();

  //Si no recibe info de las recetas devuelve un error
  if (!data) throw new Error("Error en la API");

  //buscamos en la Api una receta que tenga el name que recibimos por parametros
  let recipeExist = data.find((recipe) => recipe.name === name);
  //Si existe devolvemos un error y no creamos la receta
  if (recipeExist) throw new Error("La receta ya existe");

  //Si recibimos un string en vez de un numero, lo convertimos.
  if (typeof healthScore === "string") healthScore = Number(healthScore);
  dishTypes = dishTypes.join(", ");
  const [mynewRecipe, created] = await Recipe.findOrCreate({
    where: {
      name: name,
      image: image,
      summary: summary,
      healthScore: healthScore,
      dishTypes: dishTypes,
      steps: steps,
    },
  });

  mynewRecipe.addDiet(dietId);
  return mynewRecipe;
}

module.exports = {createRecipes}
