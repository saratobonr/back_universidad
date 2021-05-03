const express = require("express");

const router = express.Router();


const _personasController = require('../controllers/personas/personas');



router
  //crud personas
  .get("/inicio", _personasController.getPersonas)
  .post("/inicio", _personasController.createPersona)
  .put("/inicio", _personasController.updatePersona)
  .delete("/inicio", _personasController.deletePersona);

module.exports = router;