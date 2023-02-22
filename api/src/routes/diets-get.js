const { Router } = require("express");
const dietGet = Router();
const { getDiet } = require ("../controllers/contro.diet")


//<-------- DIETAS -------->
//Obtener todos los tipos de dieta posibles
dietGet.get("/diets", async (req, res) => {
  try {
    const getAllDiets = await getDiet();
    res.status(200).json(getAllDiets);
  } catch (error) {
    res.status(401).send(error.message);
  }
});

module.exports =dietGet; 


// let ruta = `https://api.spoonacular.com/recipes/complexSearch?apiKey=${clave}&addRecipeInformation=true&number=100`;

// const getAllDietsApi = async () => {
//     const isEmpty = await Diets.findAll();
//     if(!isEmpty.length){
//       let recetas = ["vegetarian"];
//       const peticion = await axios.get(ruta);
//       let data = await peticion.data.results; //data Es Un Array De Objetos De Recetas

//       data.forEach((elem) => {
//         recetas = [...recetas, ...elem.diets];
//       });
//       recetas = [...new Set(recetas)];
//       for(let name of recetas){
//         await Diets.create({name: name});
//       }
//       // return recetas;
//       const dietas = await Diets.findAll();
//       return dietas;
//     }else{
//       return isEmpty;
//     }
// };