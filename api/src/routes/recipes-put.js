const { Router } = require("express");
const putRecipe = Router();



//Editamos la receta
putRecipe.put("/edit/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const { name, image, summary, healthScore, steps, dishTypes } =
      req.body;
    // console.log(name);
    const recipe = {
      id,
      name,
      image,
      summary,
      healthScore,
      steps,
      dishTypes,
      
    };
    res.status(200).send({ message: "La receta fue editada"});
  } catch (error) {
    res.status(401).send(error.message);
  }
});

module.exports = putRecipe;
