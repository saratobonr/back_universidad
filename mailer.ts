const nodemailer = require('nodemailer');

async function main(){

    let testAccoutn = await nodemailer.createTestAccount();

    let transporter = nodemailer.createTransport({
        host: "smtp.gmail.com",
        port: 465,
        secure: true,
        auth: {
            user: "backuniversidadweb@gmail.com", // generated ethereal user
            pass: "vmfjgufizghcwjxe", // generated ethereal password
          },
    });


  let info = await transporter.sendMail({
    from: "Remitente",
    to: "saratobon09@gmail.com",
    subject: "Base de datos universidad",
    text: "Su nombre y correo fueron agregados con éxito a la base de datos.",
  });

  console.log("Message sent: %s", info.messageId);


}

main().catch(console.error);