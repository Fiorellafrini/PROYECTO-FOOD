const { Router } = require("express");
const recipesPost = Router();
const { Diet, Recipe, RecipesDiet } = require("../db");


//Creamos una receta y la guardamos en la base de datos
recipesPost.post("/", async (req, res) => {
  
    const { name, image, summary, healthScore, steps, dishTypes, diet } = req.body; //los datos que recibo por body son los modelos

  // VALIDACION DE DATOS
    if (!name || !summary ) res.status(400).json({mge: "Faltan datos"})
    // no pongo todas las prop de modelos porque los que dicen defaultvalue no los pongo ya que se crean solas las que pase por defecto.

    try {
      //agrego  la newreceta a mi base de datos, con un llamado asyn
    const newRecipe = await Recipe.create({ name, image, summary, healthScore, steps, dishTypes }); 

//  console.log("MODELO", Recipe.__proto__);
//  console.log("ENTIDAD", newRecipe.__proto__);

      newRecipe.addDiet(diet); 
      // relaciona la receta nueva con la dieta en la que se encuentre

    res.status(200).send(newRecipe);
  } catch (error) {
    res.status(400).send(error.message);
  }
});


module.exports = recipesPost;
