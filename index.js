/**
 * Archivo principal de la app
 */

 const express = require("express");
 const router = require('./app/routers/index');
 const app = express();
 app.use(express.json());
 app.use("/", router);
 const PORT =3001;

  app.listen(PORT, () => {
      console.log(`Server started on port: http://localhost:3001/inicio`);
  });