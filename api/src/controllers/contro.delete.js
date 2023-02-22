const { Diet, Recipe, RecipesDiet } = require("../db");
// const  deleteMyRecipe  = require("../routes/recipes-delete");
const { Op } = require("sequelize");


async function deleteMyRecipe(
    id,
    name,
    image,
    summary,
    healthScore,
    steps,
    dishTypes,
    dietId,
  ) {
    const result = Recipe.findAll({
      where: {
        id: {
          [Op.eq]: id,
        },
      },
    });
    await Recipe.destroy({
      where: {
        id: id,
      },
    });
  
    return result;
  }

  module.exports = {  
    deleteMyRecipe,
  };
  