const { Router } = require("express");
// const getDiets = require("../routes/diets-get")
const { Diet } = require("../db");



async function getDiet(){
  //Creamos un array con todas las dietas posibles
  const AllDiets = [
    "gluten free",
    "ketogenic",
    "vegetarian",
    "lacto ovo vegetarian",
    "ovo-vegetarian",
    "vegan",
    "pescatarian",
    "paleolithic",
    "primal",
    "low fodmap",
    "whole 30",
    "dairy free",
  ];

  //iteramos sobre cada valor del array
  //Utilizamos findOrCreate
  //Este método nos posibilita buscar
  //cualquier instancia que cumpla la condición que nosotros digamos
  // y, en el caso de que esta instancia no exista, la creará.

  for (let diet of AllDiets) {
    const [instance, created] = await Diet.findOrCreate({
      where: { name: diet },
    });
  }

  //Luego llamamos al metodo findAll en Diet
  //Para guardar todas las dietas de la base de datos en allDiets
  const allDiets = await Diet.findAll();

  //Retornamos todas las dietas
  return allDiets;

}


module.exports = {getDiet}

