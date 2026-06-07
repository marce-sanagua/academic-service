const db = require("../db/db");

const getCalificaciones = (req, res) => {
  const materia_id = req.params.id;
  db.query(
    "SELECT * FROM calificaciones WHERE materia_id = ?",
    [materia_id],
    (err, result) => {
      if (err) return res.status(500).json(err);
      res.json(result);
    }
  );
};

const guardarCalificacion = (req, res) => {
  const materia_id = req.params.id;
  const { user_id, parcial1, parcial2, nota, comentario } = req.body;

  db.query(
    "SELECT * FROM calificaciones WHERE materia_id = ? AND user_id = ?",
    [materia_id, user_id],
    (err, results) => {
      if (err) return res.status(500).json(err);

      if (results.length > 0) {
        db.query(
          "UPDATE calificaciones SET parcial1 = ?, parcial2 = ?, nota = ?, comentario = ? WHERE materia_id = ? AND user_id = ?",
          [parcial1, parcial2, nota, comentario, materia_id, user_id],
          (err) => {
            if (err) return res.status(500).json(err);
            res.json({ message: "Calificación actualizada" });
          }
        );
      } else {
        db.query(
          "INSERT INTO calificaciones (materia_id, user_id, parcial1, parcial2, nota, comentario) VALUES (?, ?, ?, ?, ?, ?)",
          [materia_id, user_id, parcial1, parcial2, nota, comentario],
          (err, result) => {
            if (err) return res.status(500).json(err);
            res.json({ message: "Calificación guardada", id: result.insertId });
          }
        );
      }
    }
  );
};

const eliminarCalificacion = (req, res) => {
  const { id, user_id } = req.params;
  db.query(
    "DELETE FROM calificaciones WHERE materia_id = ? AND user_id = ?",
    [id, user_id],
    (err) => {
      if (err) return res.status(500).json(err);
      res.json({ message: "Calificación eliminada" });
    }
  );
};

module.exports = { getCalificaciones, guardarCalificacion, eliminarCalificacion };