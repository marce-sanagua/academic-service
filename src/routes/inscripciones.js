const express = require("express");
const router = express.Router();

const inscripcionesController = require("../controllers/inscripcionesController");

router.post("/materias/:id/inscripciones", inscripcionesController.inscribir);

router.get("/materias/:id/alumnos", inscripcionesController.getAlumnosMateria);

router.delete(
  "/materias/:id/inscripciones/:alumnoId",
  inscripcionesController.eliminarInscripcion
);


router.get(
  "/usuarios/:id/materias",
  inscripcionesController.getMateriasDeUsuario
);

module.exports = router;