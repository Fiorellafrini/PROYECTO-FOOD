//aca esta mi enrutador y es el que tiene la responzabilidad de definir las rutas 

const { Router } = require('express');
const router = Router();

// Importar todos los routers;
//voy a hacer mi enrutador-

const searchRecipesInApiAndDB = require("./recipes-getAllRecipes");
const recipesGetId = require("./recipes-id");
const recipesGetName = require("./recipes-name");
const recipesPost = require("./recipes-post");
const deleteRecipe = require("./recipes-delete");
const putRecipe = require("./recipes-put");
const dietGet = require("./diets-get");

// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);
router.use(recipesGetName);
router.use(recipesGetId);
router.use(recipesPost);
router.use(deleteRecipe);
router.use(putRecipe);
router.use(dietGet);
router.use(searchRecipesInApiAndDB);




module.exports = router;
