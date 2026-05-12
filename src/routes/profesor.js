const express = require("express");
const router = express.Router();

const profesorController = require("../controllers/profesorController");


router.get("/materias/:id", profesorController.getMateriasProfesor);


router.get("/materias/:id/alumnos", profesorController.getAlumnosMateria);

module.exports = router;