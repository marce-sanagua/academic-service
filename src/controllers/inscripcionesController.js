const db = require("../db/db");
const axios = require("axios");

const inscribir = async (req, res) => {
  const materia_id = req.params.id;
  const { user_id } = req.body;

 try {
    const userResponse = await axios.get(
      `${process.env.USERS_SERVICE_URL}/usuarios/${user_id}`,
      { headers: { Authorization: req.headers.authorization } }
    );

    const user = userResponse.data;

    if (!user) {
      return res.status(404).json({ message: "Usuario no existe" });
    }

    if (user.rol !== "alumno") {
      return res.status(403).json({
        message: "Solo alumnos pueden inscribirse"
      });
    }

    db.query(
      "SELECT * FROM inscripciones WHERE user_id = ? AND materia_id = ?",
      [user_id, materia_id],
      (err, results) => {
        if (err) return res.status(500).json(err);

        if (results.length > 0) {
          return res.status(400).json({
            message: "Ya está inscrito en esta materia"
          });
        }

        db.query(
          "INSERT INTO inscripciones (user_id, materia_id) VALUES (?, ?)",
          [user_id, materia_id],
          (err, result) => {
            if (err) return res.status(500).json(err);
            res.status(201).json({
              message: "Inscripción exitosa",
              id: result.insertId,
              user_id,
              materia_id
            });
          }
        );
      }
    );
  } catch (error) {
    return res.status(500).json({
      message: "Error comunicando con users-service",
      error: error.message
    });
  }
};

const getAlumnosMateria = (req, res) => {
  const materia_id = req.params.id;
  db.query(
    "SELECT * FROM inscripciones WHERE materia_id = ?",
    [materia_id],
    (err, result) => {
      if (err) return res.status(500).json(err);
      res.json(result);
    }
  );
};

const eliminarInscripcion = (req, res) => {
  const materia_id = req.params.id;
  const user_id = req.params.user_id;
  db.query(
    "DELETE FROM inscripciones WHERE materia_id = ? AND user_id = ?",
    [materia_id, user_id],
    (err) => {
      if (err) return res.status(500).json(err);
      res.json({ message: "Inscripción eliminada" });
    }
  );
};

const getMateriasDeUsuario = (req, res) => {
  const user_id = req.params.id;
  const query = `
    SELECT m.*
    FROM materias m
    JOIN inscripciones i ON m.id = i.materia_id
    WHERE i.user_id = ?
  `;
  db.query(query, [user_id], (err, result) => {
    if (err) return res.status(500).json(err);
    res.json(result);
  });
};

const getCount = (req, res) => {
  db.query("SELECT COUNT(*) as total FROM inscripciones", (err, result) => {
    if (err) return res.status(500).json(err);
    res.json({ total: result[0].total });
  });
};

module.exports = {
  inscribir,
  getAlumnosMateria,
  eliminarInscripcion,
  getMateriasDeUsuario,
  getCount,
};