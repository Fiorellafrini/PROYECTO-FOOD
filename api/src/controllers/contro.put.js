const { Diet, Recipe, RecipesDiet } = require("../db");
const putMyRecipe = require("../routes/recipes-put");
// const specialCharactresTypeRegex = /[0-9@:%._+~#=]/gi;
// const { Op } = require("sequelize");



async function putMyRecipe(
  id,
  name,
  image,
  summary,
  healthScore,
  steps,
  dishTypes,
) {
  const updateRecipe = await Recipe.update(
    {
      name: name,
      image: image,
      summary: summary,
      healthScore: healthScore,
      dishTypes: dishTypes.join(","),
      steps: steps,
    },
    { where: { id: id } },
  );
  return updateRecipe;
}

module.exports= {putMyRecipe}