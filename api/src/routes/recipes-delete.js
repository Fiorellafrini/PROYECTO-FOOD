const { Router } = require("express");
const deleteRecipe = Router();
const {deleteMyRecipe} = require("../controllers/contro.delete")


//Eliminamos la receta
deleteRecipe.delete("/delete/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const recipe = await deleteMyRecipe(id);
    res
      .status(200)
      .send({ message: "La receta fue eliminada", element: recipe });
  } catch (error) {
    res.status(401).send(error.message);
  }
});
module.exports = deleteRecipe;


