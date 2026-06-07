const express = require("express");
const router = express.Router();
const profesorController = require("../controllers/profesorController");
const verificarToken = require("../middlewares/authMiddleware");

router.get("/materias/:id", verificarToken, profesorController.getMateriasProfesor);
router.get("/materias/:id/alumnos", verificarToken, profesorController.getAlumnosMateria);

module.exports = router;