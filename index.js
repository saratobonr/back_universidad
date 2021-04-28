/**
 * Archivo principal de la app
 */

 const express = require("express");
 const app = express();


 app.get("/inicio", (req, res) => {
    res.send('Hello World!')
  });


  app.post("/", (req, res) => {
    res.send('Hello World!')
  });


  app.put("/", (req, res) => {
    res.send('Hello World!')
  });

  app.delete("/", (req, res) => {
    res.send('Hello World!')
  });

  const PORT =3001;

  app.listen(PORT, () => {
      console.log(`Server started on port: http://localhost:3001`);
  });