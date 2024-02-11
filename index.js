//PARA OBTENER EL NOMBRE DEL COMERCIO CON EL RTN
//https://placas.ip.gob.hn/enlace/consulta?Criterios=1&Identificacion=05071995001557

require("dotenv").config();
const express = require("express");
const cors = require("cors");
const app = express();
const { dbConnectMySQL } = require("./config/mysql");

app.use(cors());
app.use(express.json());
app.use(express.static('storage'));
const port = 3000;

app.get("/", (req, res) => {
    res.send("Hola mi server en Express");
});
app.use("/api/v1", require("./routes"));

app.listen(port, () => {
    console.log("My port: " + port);
});

dbConnectMySQL();


const { exec } = require('child_process');

exec('wmic printer get name', (error, stdout, stderr) => {
    if (error) {
        console.error(`Error al ejecutar el comando: ${error.message}`);
        return;
    }
    if (stderr) {
        console.error(`Error en la salida estándar: ${stderr}`);
        return;
    }
    // Imprime la lista de impresoras
    console.log(stdout);
});


const nombreImpresora = 'Canon G4010 series';

// Generar la factura HTML dinámicamente aquí
const facturaHTML = `
    <html>
    <head><title>Factura</title></head>
    <body>
      <h1>Factura</h1>
      <!-- Aquí van los datos de la factura -->
      <h2>Esta es una factura de prueba</h2></h2>
    </body>
    </html>
  `;

// Imprimir la factura directamente a la impresora especificada
printer.printDirect({
    data: facturaHTML,
    type: 'RAW',
    printer: nombreImpresora, // Especifica el nombre de la impresora aquí
    success: () => {
        console.log('Factura impresa correctamente en', nombreImpresora);
        //res.status(200).send('Factura impresa correctamente');
    },
    error: (err) => {
        console.error('Error al imprimir la factura:', err);
        //res.status(500).send('Error al imprimir la factura');
    }
});