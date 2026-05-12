const express = require("express");
const router = express.Router();
const materiasController = require("../controllers/materiasController");

router.get("/", materiasController.getMaterias);
router.post("/", materiasController.createMateria);


router.get("/:id", materiasController.getMateriaById);

module.exports = router;