/**
 * Archivo principal de la app
 */

 const express = require("express");
 const app = express();


 app.get("/", (req, res) => {
    res.send('Hello World!')
  });

  const PORT =3001;
  app.listen(PORT, () => {
      console.log(`Server started on port: http://localhost:3001`);
  });