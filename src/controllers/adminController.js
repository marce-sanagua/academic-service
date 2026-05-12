const db = require("../db/db");



const crearMateria = (req, res) => {
  const { nombre, profesor_id } = req.body;

  const query = `
    INSERT INTO materias (nombre, profesor_id)
    VALUES (?, ?)
  `;

  db.query(query, [nombre, profesor_id], (err, result) => {
    if (err) return res.status(500).json(err);

    res.json({
      message: "Materia creada",
      id: result.insertId
    });
  });
};



const getMaterias = (req, res) => {
  db.query("SELECT * FROM materias", (err, result) => {
    if (err) return res.status(500).json(err);

    res.json(result);
  });
};



const axios = require("axios");

const asignarProfesor = async (req, res) => {
  const materia_id = req.params.id;
  const { profesor_id } = req.body;

  try {
    
    const response = await axios.get(
      `http://localhost:3000/usuarios/${profesor_id}`
    );

    const usuario = response.data;

      if (!usuario) {
      return res.status(404).json({
        message: "Usuario no existe"
      });
    }

    
    if (usuario.rol !== "profesor") {
      return res.status(400).json({
        message: "El usuario no es profesor"
      });
    }

    
    db.query(
      `UPDATE materias SET profesor_id = ? WHERE id = ?`,
      [profesor_id, materia_id],
      (err) => {
        if (err) return res.status(500).json(err);

        res.json({ message: "Profesor asignado correctamente" });
      }
    );

  } catch (error) {
    res.status(500).json({
      message: "Error validando usuario",
      error: error.message
    });
  }
};


module.exports = {
  crearMateria,
  getMaterias,
  asignarProfesor
};