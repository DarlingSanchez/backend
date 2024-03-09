/*const { handleHttpError, handleErrorResponse } = require("../utils/handleError");
const { matchedData } = require("express-validator");

const escpos = require('escpos');


const usbDevice = new escpos.USB();
const printer = new escpos.Printer(usbDevice);



// Ruta para imprimir documentos
const imprimirDocumento = async(req, res) => {
    const printerName = req.body.printer_name;
    const documentContent = req.body.document_content;

    // Conectar a la impresora
    printer.open((error) => {
        if (error) {
            console.error('Error al conectar con la impresora:', error);
            res.status(500).send('Error al conectar con la impresora');
            return;
        }

        // Cambiar a la impresora especificada (si se proporciona)
        if (printerName) {
            printer.printer = new escpos.Serial(printerName);
        }

        // Imprimir documento
        printer
            .text(documentContent)
            .cut()
            .close()
            .then(() => {
                console.log('Documento impreso con éxito');
                res.send('Documento impreso con éxito');
            })
            .catch((error) => {
                console.error('Error al imprimir el documento:', error);
                handleHttpError(res, `ERROR AL IMPRIMIR ${error}`);

                res.status(500).send('Error al imprimir el documento');
            });
    });
};



module.exports = { imprimirDocumento };*/