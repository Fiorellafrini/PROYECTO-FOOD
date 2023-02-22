//                       _oo0oo_
//                      o8888888o
//                      88" . "88
//                      (| -_- |)
//                      0\  =  /0
//                    ___/`---'\___
//                  .' \\|     |// '.
//                 / \\|||  :  |||// \
//                / _||||| -:- |||||- \
//               |   | \\\  -  /// |   |
//               | \_|  ''\---/''  |_/ |
//               \  .-\__  '-'  ___/-. /
//             ___'. .'  /--.--\  `. .'___
//          ."" '<  `.___\_<|>_/___.' >' "".
//         | | :  `- \`.;`\ _ /`;.`/ - ` : | |
//         \  \ `_.   \_ __\ /__ _/   .-` /  /
//     =====`-.____`.___ \_____/___.-`___.-'=====
//                       `=---='
//     ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
//---Aca se inicia la aplicacion---
const server = require('./src/app.js');
const { conn } = require('./src/db.js');
require("dotenv").config();

// Syncing all the models at once.
conn.sync({ force: true }).then(async () => { // EL FORCE HACE UN REINICIO/ SI NO QUIERO QUE SE REINICIE pongo false. Generalmente cuando ya quiero que quede todo fijo y por ej. paso a la parte de front., 
  
  // await getApiInfo();
  
  server.listen(3001, () => { // pongo a escuchar a mi servidor en el puerto 3001
    console.log('%s listening at 3001'); // eslint-disable-line no-console
  });
});
