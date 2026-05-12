const express = require("express");
const router = express.Router();

const adminController = require("../controllers/adminController");

const verificarToken = require("../middlewares/authMiddleware");
const verificarRol = require("../middlewares/roleMiddleware");

// 🔒 SOLO ADMIN puede crear materias
router.post(
  "/materias",
  verificarToken,
  verificarRol("admin"),
  adminController.crearMateria
);


router.get(
  "/materias",
  verificarToken,
  verificarRol("admin"),
  adminController.getMaterias
);


router.put(
  "/materias/:id/profesor",
  verificarToken,
  verificarRol("admin"),
  adminController.asignarProfesor
);

module.exports = router;