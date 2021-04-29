
const PostgresService = require('../../services/postgres.service');
const _pg = new PostgresService();


const getPersonas = async (req, res  ) => {
    
    let sql = 'select * from personas'
    let result = await _pg.ejecutarSql(sql);

    return res.send(result);  
};

const createPersona = (req, res) => {
    return res.send("Create persona");
};

const updatePersona = (req, res) => {
    return res.send("Update persona");
};

const deletePersona = (req, res) => {
    return res.send("Delete persona");
};

module.exports = {getPersonas, createPersona, updatePersona, deletePersona};