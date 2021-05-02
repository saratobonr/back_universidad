const nodemailer = require("nodemailer");

class nodemailerService {
	constructor() {
        this.configTransporter()
		this.correoRemitente = '"Universidad" <crea_un_correo@gmail.com>';
	}

	async configTransporter() {
		this.transporter = nodemailer.createTransport({
			host: "smtp.gmail.com",
			port: 465,
			secure: true,
			auth: {
				user: "backuniversidadweb@gmail.com",
				pass: "vmfjgufizghcwjxe" 
			},
            tls: {
                rejectUnauthorized: false
          }
		});
	}
	async enviarCorreo(destinatario, asunto, cuerpo) {
        console.log("Correo enviado");
		await this.transporter.sendMail({
			from: this.correoRemitente,
			to: destinatario,
			subject: asunto,
			html: cuerpo,
		});
	}
}

module.exports = nodemailerService;