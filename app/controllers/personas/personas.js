// intento nodemailer

//let transporter = nodemailer.createTransport(transport[, defaults])
const PostgresService = require('../../services/postgres.service');
const _pg = new PostgresService();
const nodemailerService = require('../../services/nodemailer.service');
const _nodemailer = new nodemailerService();




/**
 * Consultar todas las personas
 * @param {Request} req 
 * @param {Response} res 
 * @returns
 */


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


/**
 * Consultar una persona
 * @param {Request} req 
 * @param {Response} res 
 * @returns
 */


const getPersona = async (req, res) => {
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


/**
 * Crer persona
 * @param {Request} req 
 * @param {Response} res 
 * @returns
 */

const createPersona =  async (req, res) => {
     try {
        let persona = req.body;
        let sql = `INSERT INTO public.personas ("nombre", correo) VALUES($1, $2)`;
        let datos = [persona.nombre, persona.correo];
        let result = await _pg.ejecutarSql2(sql, datos);

        if (result.rowCount == 1){
            let asunto = "Bienvenido";
            let cuerpo = `<h3> Bienvenido  ${persona.nombre} se ha registrado con éxito </h3>`;            
            await _nodemailer.enviarCorreo(persona.correo, asunto, cuerpo);
        }

        return res.send({
            ok: result.rowCount == 1,
            message: result.rowCount == 1 ? "Persona creada" : "La persona no fue creada",
            content: persona,
    });
    }catch (error) {
        return res.send({
            ok: false,
            message: "Ha ocurrido un error crendo la persona",
            content: error.toString(),
        });     
    }
    
};

/**
 * Actualizar persona
 * @param {Request} req 
 * @param {Response} res 
 * @returns
 */

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

};

/**
 * Eliminar persona
 * @param {Request} req 
 * @param {Response} res 
 * @returns
 */

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
};

module.exports = { getPersonas, getPersona, createPersona, updatePersona, deletePersona };