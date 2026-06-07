const express = require("express");
const router = express.Router();
const materiasController = require("../controllers/materiasController");
const verificarToken = require("../middlewares/authMiddleware");
const calificacionesController = require("../controllers/calificacionesController");



router.get("/", verificarToken, materiasController.getMaterias);
router.post("/", verificarToken, materiasController.createMateria);
router.get("/:id", verificarToken, materiasController.getMateriaById);
router.get("/:id/calificaciones", verificarToken, calificacionesController.getCalificaciones);
router.post("/:id/calificaciones", verificarToken, calificacionesController.guardarCalificacion);

module.exports = router;