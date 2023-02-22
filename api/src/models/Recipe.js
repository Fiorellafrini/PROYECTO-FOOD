const { DataTypes } = require('sequelize');
// Exportamos una funcion que define el modelo
// Luego le injectamos la conexion a sequelize.
module.exports = (sequelize) => {
  // defino el modelo, LA TABLA 
  sequelize.define(
    'recipe', 
    {//DEFINO LAS COLUMNAS
    id: {
      type: DataTypes.UUID, //Universal Unique Identifier ,  identificador único generado por máquina de un cierto rango. Es para generar ID largos y diferentes que no se pisen con los que están en la API.
      defaultValue: DataTypes.UUIDV4, //version 4, las otras son pseudoaleatorias
      primaryKey: true,
      // allowNull: false
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    image: {
      type: DataTypes.STRING,
      allowNull: true,
      defaultValue: "http://i.pinimg.com/564x/42/18/ee/4218ee7c10701eef0340a99eba7cee83.jpg"
    },
    summary: { // resumen
      type: DataTypes.TEXT,
      allowNull: false,
    },
    dishTypes: {  //tipo de plato
      type: DataTypes.TEXT,
      allowNull: true,
      defaultValue: "Main dish",
    },
    healthScore: { // nivel de comida saludable
      type: DataTypes.INTEGER,
      allowNull: true,
      defaultValue: 50,
    },
    steps: { //paso 
      type: DataTypes.TEXT,
      allowNull: true,
      defaultValue: "No se encuentran los pasos de esta receta",
   },
  },
  {
    paranoid: true,
    timestamps: false,
  },
);
};

