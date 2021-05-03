const express = require("express");

const router = express.Router();


const _personasController = require('../controllers/personas/personas');



router
  //crud personas
  .get("/inicio", _personasController.getPersonas)
  .get("/excel", _personasController.descargarInforme)
  .post("/inicio", _personasController.createPersona);


module.exports = router;