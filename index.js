/**
 * Archivo principal de la app
 */

 const express = require("express");
 const router = require('./app/routers/index');
 const { patch } = require("./app/routers/index");
 const app = express();
 const path = require("path");
 app.use(express.json());
 app.use('/', router);

 app.use(express.static(path.join(__dirname, "public")));
 app.use("/documentos-excel", express.static(path.join(__dirname, "dococumentos-excel")));

 const PORT =3001;

  app.listen(PORT, () => {
      console.log(`Server started on port: http://localhost:3001/inicio`);
  });