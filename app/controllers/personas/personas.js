
// base de datos
const PostgresService = require('../../services/postgres.service');
const _pg = new PostgresService();
// correo
const nodemailerService = require('../../services/nodemailer.service');
const _nodemailer = new nodemailerService();
// exceñ
const excelService = require('../../services/exceljs.service');
const _exceljs = new excelService();

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
            ok: false,
            message: "Ha ocurrido un error consultando las personas",
            content: error,
        });   
    }      
};


/**
 * Crear una persona y enviar correo de bienvenida
 * @param {Require} req 
 * @param {Responde} res 
 */

const createPersona =  async (req, res) => {
    
    try {
        let persona = req.body;    
        let sql = `INSERT INTO public.personas("nombre", correo) VALUES('${persona.nombre}', '${persona.correo}');`;
        let datos = [persona.nombre, persona.correo];
        //let result = await _pg.ejecutarSqlCorreo(sql, datos);
        let result = await _pg.ejecutarSql(sql);

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
        console.log(error);
        return res.send({ 
            ok: false,
            message: "Ha ocurrido un error crendo la persona",
            content: error.toString(),
        });     
    }
};

/**
 * Descarger en formato excel la tabla personas de la base de datos
 * @param {Require} req 
 * @param {Response} res 
 */
const descargarInforme = async (req, res) => {
    let sql = `select id, nombre, correo FROM public.personas;`;

    try {
        let result = await _pg.ejecutarSql(sql);
        let rows = result.rows;

        await _exceljs.hojas(rows);
            return res.send({
                ok:true,
                message: "Excel creado con éxito",
                url: "http://localhosto:3001/docs/universidad.xlsx",
            });

    } catch (error) {
        return res.send({
            ok:false,
            message: "Error crendo el reporte de excel",
            content: error,
        });
    }
}

module.exports = { getPersonas, createPersona, descargarInforme };