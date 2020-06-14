const getAll = () => {
    return new Promise((resolve, reject) => {
        db.query("select * from ejercicios", (err, rows) => {
            if (err) reject(err)
            resolve(rows);
        });
    });
};

const getById = pEjercicioId => {
    return new Promise((resolve, reject) => {
        db.query(
            "select * from ejercicios where id = ?", [pEjercicioId],
            (err, rows) => {
                if (err) {
                    reject(err);
                } else {
                    if (rows.length === 0) {
                        resolve(null);
                    } else {
                        resolve(rows[0]);
                    }
                }
            }
        );
    });
};

const create = ({ titulo, duracion, repeticiones }) => {
    return new Promise((resolve, reject) => {
        db.query(
            "insert into ejercicios (titulo, duracion, repeticiones) values (?,?,?)", [titulo, duracion, repeticiones],
            (err, result) => {
                if (err) {
                    reject(err);
                } else {
                    resolve(result);
                }
            }
        );
    });
};

const deleteById = (EjercicioId) => {
    console.log(EjercicioId)
    return new Promise((resolve, reject) => {

        db.query('delete from ejercicios where id = ?', [EjercicioId], (err, result) => {
            if (err) reject(err);
            resolve(result);
        })
    });
}

const update = ({ titulo, duracion, repeticiones, id }) => {

    return new Promise((resolve, reject) => {
        db.query("update ejercicios set titulo=?, duracion=?, repeticiones=? where id=?", [titulo, duracion, repeticiones, id],
            (err, result) => {
                if (err) {
                    reject(err);
                } else {
                    resolve(result);
                }
            }
        );
    });
};

const updateById = ({ titulo, duracion, repeticiones, id }) => {
    return new Promise((resolve, reject) => {
        db.query(
            'update ejercicios SET titulo = ?,  duracion = ?, repeticiones = ?  WHERE id = ?', [titulo, duracion, repeticiones, id],
            (err, result) => {
                if (err) {
                    reject(err);
                } else {
                    resolve(result);
                }
            }
        );
    });
};



module.exports = {
    getAll: getAll,
    getById: getById,
    create: create,
    deleteById: deleteById,
    update: update,
    updateById: updateById
};