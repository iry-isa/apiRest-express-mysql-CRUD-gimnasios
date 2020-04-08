const router = require('express').Router();

const Ejercicio = require('../../models/ejercicio');

// GET http://localhost:3000/api/ejercicios
router.get('/', async (req, res) => {
    const rows = await Ejercicio.getAll();
    res.json(rows);
});

// GET http://localhost:3000/api/ejercicios
router.get('/:ejercicioId', async (req, res) => {
    const ejercicio = await Ejercicio.getById(req.params.ejercicioId);
    res.json(ejercicio);
});

// POST http://localhost:3000/api/ejercicios

router.post("/", async (req, res) => {
    const result = await Ejercicio.create({
        titulo: req.body.titulo,
        duracion: req.body.duracion,
        repeticiones: req.body.repeticiones
    });
    res.status(201).json(result);
    {
        res.status(500).json(err);
    }
});

// DELETE http://localhost:3000/api/ejercicios/:id
router.delete('/:id', async (req, res) => {
    const result = await Ejercicio.deleteById(req.params.id);
    if (result['affectedRows'] === 1) {
        res.json({ success: 'Se ha borrado el ejercicio ' });
    } else {
        res.json({ error: 'No se ha borrado el ejercicio ' })
    }
});


// PUT http://localhost:3000/api/ejercicios

router.put('/:id', async (req, res) => {
    const result = await Ejercicio.update({
        id: req.params.id,
        titulo: req.body.titulo,
        duracion: req.body.duracion,
        repeticiones: req.body.repeticiones
    }).catch((err) => {
        console.log(err);
        res.status(500).json(err);
    });
    res.status(200).json(result);
});


// PATCH http://localhost:3000/api/ejercicios/:id

router.patch('/:id', async (req, res) => {
    const result = await Ejercicio.updateById({
        id: req.params.id,
        titulo: req.body.titulo,
        duracion: req.body.duracion,
        repeticiones: req.body.repeticiones
    }).catch((err) => {
        console.log(err);
        res.status(500).json(err);
    });
    res.status(200).json(result);
});

module.exports = router;

