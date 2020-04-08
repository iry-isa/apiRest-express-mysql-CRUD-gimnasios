const router = require('express').Router();

const Profesor = require('../../models/profesor');

// GET http://localhost:3000/api/profesores
router.get('/', async (req, res) => {
    const rows = await Profesor.getAll();
    res.json(rows);
});

// GET http://localhost:3000/api/profesores
router.get('/:profesorId', async (req, res) => {
    const profesor = await Profesor.getById(req.params.profesorId);
    res.json(profesor);
});

// POST http://localhost:3000/api/profesores  ok
router.post('/', async (req, res) => {
    const result = await Profesor.create(req.body);
    if (result['affectedRows'] === 1) {
        const profesor = await Profesor.getById(result['insertId']);
        res.json(profesor);
    } else {
        res.json({ error: "El profesor no se ha insertado" });
    }
});

/// DELETE http://localhost:3000/api/profesores/:id
router.delete('/:id', async (req, res) => {
    const result = await Profesores.deleteById(req.params.id);
    if (result['affectedRows'] === 1) {
        res.json({ success: 'Se ha borrado el profesor ' });
    } else {
        res.json({ error: 'No se ha borrado el profesor ' })
    }
});

// PUT http://localhost:3000/api/profesores

router.patch("/", async (req, res) => {

    const result = await Profesor.update({
        id: req.params.id,
        nombre: req.body.nombre,
        experiencia: req.body.experiencia
    }).catch((err) => {
        console.log(err);
        res.status(500).json(err);
    });
    res.status(200).json(result);
});

// PATCH http://localhost:3000/api/profesores

router.patch("/:id", async (req, res) => {

    const result = await Profesor.updateById({
        id: req.params.id,
        nombre: req.body.nombre,
        experiencia: req.body.experiencia
    }).catch((err) => {
        console.log(err);
        res.status(500).json(err);
    });
    res.status(200).json(result);
});
module.exports = router;