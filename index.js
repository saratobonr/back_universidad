/**
 * Archivo principal de la app
 */

 const express = require("express");
 const app = express();


const router = require('./app/routers/index');
const { post } = require("./app/routers/index");

  app.use("/", router);

  const PORT =3001;

  app.listen(PORT, () => {
      console.log(`Server started on port: http://localhost:3001/inicio`);
  });