const router = require('express').Router();

const Cliente = require('../../models/cliente');
const { check, validationResult } = require('express-validator');




// GET http://localhost:3000/api/clientes
router.get('/', async (req, res) => {
    console.log('All');
    const rows = await Cliente.getAll();
    res.json(rows);
});

// GET http://localhost:3000/api/clientes/:clienteId
router.get('/:clienteId', async (req, res) => {
    console.log('ById: ' + req.params.clienteId);
    const cliente = await Cliente.getById(req.params.clienteId);
    res.json(cliente);
});


// DELETE http://localhost:3000/api/clientes
router.delete('/', async (req, res) => {
    const result = await Cliente.deleteById(req.body.ClienteId);
    if (result['affectedRows'] === 1) {
        res.json({ success: 'Se ha borrado el cliente ' });
    } else {
        res.json({ error: 'No se ha borrado el cliente ' })
    }
});

// PUT http://localhost:3000/api/clientes/:
router.put('/:id', async (req, res) => {
    const result = await Cliente.update({
        ClienteId: req.params.id,
        nombre: req.body.nombre,
        apellidos: req.body.apellidos,
        direccion: req.body.direccion,
        email: req.body.email,
        edad: req.body.edad,
        sexo: req.body.sexo,
        cuota: req.body.cuota,
        fecha_nacimiento: req.body.fecha_nacimiento,
        dni: req.body.dni,
    }).catch((err) => {
        console.log(err);
        res.status(500).json(err);
    });
    res.status(200).json(result);
});


// PATCH http://localhost:3000/api/clientes/:id

router.patch('/:id', async (req, res) => {
    const result = await Cliente.updateById({
        ClienteId: req.params.id,
        nombre: req.body.nombre,
        apellidos: req.body.apellidos,
        direccion: req.body.direccion,
        email: req.body.email,
        edad: req.body.edad,
        sexo: req.body.sexo,
        cuota: req.body.cuota,
        fecha_nacimiento: req.body.fecha_nacimiento,
        dni: req.body.dni,
    }).catch((err) => {
        console.log(err);
        res.status(500).json(err);
    });
    res.status(200).json(result);
});


// POST http://localhost:3000/api/clientes
router.post("/", [check('dni', 'El DNI es valido').custom((value) => {
    return (/^\d{8}[a-zA-Z]$/).test(value);
})], async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json('Dni erroneo');
    }
    const result = await Cliente.create({
        id: req.body.id,
        nombre: req.body.nombre,
        apellidos: req.body.apellidos,
        direccion: req.body.direccion,
        email: req.body.email,
        edad: req.body.edad,
        sexo: req.body.sexo,
        fecha_inscripcion: req.body.fecha_inscripcion,
        cuota: req.body.cuota,
        fecha_nacimiento: req.body.fecha_nacimiento,
        dni: req.body.dni
    });
    res.status(200).json(result);
    {
        res.status(500).json(err);
    }
}
);


module.exports = router;