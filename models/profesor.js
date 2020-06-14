const getAll = () => {
    return new Promise((resolve, reject) => {
        db.query("select * from profesores", (err, rows) => {
            if (err) {
                reject(err);
            } else {
                resolve(rows);
            }
        });
    });
};

const getById = profesorId => {
    return new Promise((resolve, reject) => {
        db.query("select * from profesores where id = ?", [profesorId], (err, rows) => {
            if (err) {
                reject(err);
            } else {
                if (rows.length === 0) {
                    resolve(null);
                } else {
                    resolve(rows[0]);
                }
            }
        });
    });
};

const create = ({ nombre, experiencia }) => {
    return new Promise((resolve, reject) => {
        db.query(
            "insert into profesores (nombre, experiencia) values (?,?)", [nombre, experiencia],
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

const deleteById = ProfesorId => {
    return new Promise((resolve, reject) => {
        db.query(
            "delete from profesores where id = ?", [ProfesorId],
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

const update = ({ nombre, experiencia, id }) => {
    return new Promise((resolve, reject) => {
        db.query(
            "Update profesores SET nombre=?, experiencia=? where id=?", [nombre, experiencia, id],
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
const updateById = ({ nombre, experiencia, id }) => {
    return new Promise((resolve, reject) => {
        db.query(
            "Update profesores SET nombre=?, experiencia=? where id=?", [nombre, experiencia, id],
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