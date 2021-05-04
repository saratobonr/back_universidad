const Exceljs = require("exceljs");


class excelService {
    
    constructor(){
        this.doc1 = new Exceljs.Workbook();
    }


    async hojas (personas){
        const hoja1 = this.doc1.addWorksheet("personas");
        hoja1.columns = [
            {header: "Id", key: "id", width: 10},
            {header: "Nombre", key: "nombre", width: 32},
            {header: "Correo", key: "correo", width: 32},
        ];
        personas.forEach((persona) => {
                hoja1.addRow(persona);
        });

        await this.doc1.xlsx.writeFile("documentos-excel/universidad.xlsx");
    }
}
module.exports = excelService;