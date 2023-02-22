require('dotenv').config(); // para disponer de mis variables de .env
const { Sequelize } = require('sequelize');
const fs = require('fs');
const path = require('path');
const { DB_USER, DB_PASSWORD, DB_HOST, DB_NAME } = process.env; 
// const recipeModel = require ('./models/Recipe')
// const dietsModel = require ('./models/Diet')


//hago la coneccion con la base de datos
const sequelize = new Sequelize(
  `postgres://${DB_USER}:${DB_PASSWORD}@${DB_HOST}/${DB_NAME}`,
 {
  logging: false, // set to console.log to see the raw SQL queries
  native: false, // lets Sequelize know we can use pg-native for ~30% more speed
});
const basename = path.basename(__filename);

const modelDefiners = [];

// Leemos todos los archivos de la carpeta Models, los requerimos y agregamos al arreglo modelDefiners
fs.readdirSync(path.join(__dirname, '/models'))
  .filter((file) => (file.indexOf('.') !== 0) && (file !== basename) && (file.slice(-3) === '.js'))
  .forEach((file) => {
    modelDefiners.push(require(path.join(__dirname, '/models', file)));
  });

// Injectamos la conexion (sequelize) a todos los modelos
modelDefiners.forEach(model => model(sequelize));
// Capitalizamos los nombres de los modelos ie: product => Product
let entries = Object.entries(sequelize.models);
let capsEntries = entries.map((entry) => [entry[0][0].toUpperCase() + entry[0].slice(1), entry[1]]); //les pongo mayuscula a mis modelos
sequelize.models = Object.fromEntries(capsEntries);

// En sequelize.models están todos los modelos importados como propiedades

// recipeModel(sequelize); // son mis modelos , m/models/recipe
// dietsModel(sequelize);

// Para relacionarlos hacemos un destructuring
const { Recipe, Diet } = sequelize.models; //* me traigo los modelos del seq 


// Aca vendrian las relaciones
// Product.hasMany(Reviews);

//--SETEO DE BASE DE DATOS--
Recipe.belongsToMany(Diet, { through: "RecipeDiet",timestamps: false }); // n:n ,una receta puede estar en muchas de dieta
Diet.belongsToMany(Recipe, { through: "RecipeDiet",timestamps: false }); // n:n una dieta puede estar en muchas recetas
//se relacionan a traves de la misma tabla intermedia, la tabla se llama "recipe_diets"

module.exports = {
  ...sequelize.models, // para poder importar los modelos así: const { Product, User } = require('./db.js');
  conn: sequelize,     // para importart la conexión { conn } = require('./db.js');
};
