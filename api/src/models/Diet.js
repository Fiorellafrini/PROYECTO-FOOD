const { DataTypes } = require("sequelize");
//Exportamos una funcion que define el modelo
//Luefgo le injectamos la conexion a sewquelize

module.exports = (sequelize) => {
  //aqui defino el modelo
  sequelize.define(
    "diet",
    {
      id: {
       type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true,


      },
      name: {
        type: DataTypes.STRING,
        unique: true,
        // primaryKey: true

      },
    },
    {
      timestamps: false,
    },
  );
};

