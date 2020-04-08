const getAll = () => {
    return new Promise((resolve, reject) => {
        db.query('select * from clientes', (err, rows) => {
            if (err) reject(err)
            resolve(rows);
        });
    });
};

const getById = (ClienteId) => {
    return new Promise((resolve, reject) => {
        db.query('select * from clientes where id = ?', [ClienteId], (err, rows) => {
            if (err) reject(err);
            if (rows.length === 0) {
                resolve(null);
            }
            resolve(rows[0]);
        })
    });
};

const create = ({ id, nombre, apellidos, direccion, email, edad, sexo, fecha_inscripcion, cuota, fecha_nacimiento, dni }) => {
    return new Promise((resolve, reject) => {
        db.query('insert into clientes (id,nombre,apellidos,direccion,email,edad,sexo,fecha_inscripcion,cuota,fecha_nacimiento,dni) values (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)',

            [id, nombre, apellidos, direccion, email, edad, sexo, fecha_inscripcion, cuota, fecha_nacimiento, dni],
            (err, result) => {
                if (err) reject(err);
                resolve(result);
            });
    });
}


const deleteById = (ClienteId) => {
    console.log(ClienteId)
    return new Promise((resolve, reject) => {

        db.query('delete from clientes where id = ?', [ClienteId], (err, result) => {
            if (err) reject(err);
            resolve(result);
        })
    });
}


const update = ({ ClienteId, nombre, apellidos, direccion, email, edad, sexo, fecha_inscripcion, cuota, fecha_nacimiento, dni }) => {
    return new Promise((resolve, reject) => {
        console.log(ClienteId);
        db.query('Update clientes set nombre=?,apellidos =?,direccion=?,email=?,edad=?,sexo=?,fecha_inscripcion=?,cuota=?,fecha_nacimiento=?,dni=? where id=?',
            [ClienteId, nombre, apellidos, direccion, email, edad, sexo, fecha_inscripcion, cuota, fecha_nacimiento, dni], (err, result) => {
                if (err) {
                    return reject(err);
                }
                resolve(result);
            });
    });
};


const updateById = ({ ClienteId, nombre, apellidos, direccion, email, edad, sexo, fecha_inscripcion, cuota, fecha_nacimiento, dni }) => {
    return new Promise((resolve, reject) => {

        console.log('Updating: Id=' + ClienteId);
        db.query('Update clientes set nombre=?,apellidos =?,direccion=?,email=?,edad=?,sexo=?,fecha_inscripcion=?,cuota=?,fecha_nacimiento=?,dni=? where id=?',
            [nombre, apellidos, direccion, email, edad, sexo, fecha_inscripcion, cuota, fecha_nacimiento, dni, ClienteId], (err, result) => {
                if (err) {
                    return reject(err);
                }
                resolve(result);
            });
    });
};


module.exports = {
    getAll: getAll,
    getById: getById,
    create: create,
    deleteById: deleteById,
    update: update,
    updateById: updateById,

}
