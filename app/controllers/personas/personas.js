
const PostgresService = require('../../services/postgres.service');
const _pg = new PostgresService();


const getPersonas = async (req, res  ) => {
    //Consulta sql
    let sql = 'select * from personas';
    //Promesa con asyn-await
    try {
        let result = await _pg.ejecutarSql(sql);
        let rows = result.rows;
        return res.send({
            ok: true,
            message:"Personas consultadas",
            content: rows,
        }); 
        
    }catch (error) {
        return res.send({
            ok:false,
            message: "Ha ocurrido un error consultando las personas",
            content: error,
        });   
}   
};

const gerPersona = async (req, res) => {
    try {
        let id = req.params.id;
        let sql = "select * from personas WHERE id=' " + id + " ' ";
        let result = await _pg.ejecutarSql(sql);
        let rows = result.rows;
        return res.send({
            ok: true,
            message: "Usuario consultado",
            content: rows[0],
        });
    } catch (error) {
        return res.send({
            ok:false,
            message: "Ha ocurrido un error consultando el usuario",
            content: error,
        });
    }
};


const createPersona =  async (req, res) => {
    try {
        let persona = req.body;
        let sql = `INSERT INTO public.personas (nombre, correo) VALUES('${persona.nombre}', '${persona.correo}');`
        let result = await _pg.ejecutarSql(sql)

        return res.send({
            ok: result.rowCount ==1,
            message: result.rowCount == 1 ? "Persona creada" : "La persona no fue creada",
            content: persona,
    });
    }catch (error) {
        return res.send({
            ok: false,
            message: "Ha ocurrido un error crendo la persona",
            content: error,
        });     
    }
};

const updatePersona = async (req, res) => {
    try {
        let id= req.params.id;
        let persona = req.body;

        let sql = `UPDATE public.personas 
        SET nombre='${persona.nombre}', correo='${persona.correo}' 
        WHERE id='${id}'`;
        let result = await _pg.ejecutarSql(sql);

        return res.send({
            ok: result.rowCount ==1,
            message: result.rowCount==1 ? "Usuario modificado" : "El usuario no fue modificado",
            content: persona,
        });

    } catch (error) {

        return res.send({
            ok:false,
            message: "Ha ocurrido un error modificando a la persona",
            content: error,
        });  
    }




    return res.send("Update persona");
};

const deletePersona = async (req, res) => {

    try {
        let id = req.params.id;

        let sql = `DELETE FROM public.personas
        WHERE id='${id}'`;
        let result = await _pg.ejecutarSql(sql);

        return res.send({
            ok: result.rowCount==1,
            message: result.rowCount==1 ? "Usuario eliminado" : "El usuario no fue eliminado",
            content: id,
        });

    } catch (error) {
        return res.send({
            ok: false,
            message: "Ha ocurrido un error eliminando el usuario",
            content: error,
        });
    }




    return res.send("Delete persona");
};

module.exports = {getPersonas, createPersona, updatePersona, deletePersona};