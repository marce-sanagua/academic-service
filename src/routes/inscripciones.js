const express = require("express");
const router = express.Router();
const inscripcionesController = require("../controllers/inscripcionesController");
const verificarToken = require("../middlewares/authMiddleware");

router.post("/materias/:id/inscripciones", verificarToken, inscripcionesController.inscribir);
router.get("/materias/:id/alumnos", verificarToken, inscripcionesController.getAlumnosMateria);
router.delete("/materias/:id/inscripciones/:user_id", verificarToken, inscripcionesController.eliminarInscripcion);
router.get("/usuarios/:id/materias", verificarToken, inscripcionesController.getMateriasDeUsuario);
router.get("/count", verificarToken, inscripcionesController.getCount);

module.exports = router;