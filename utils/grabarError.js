const fs = require('fs');
const path = require('path');

// Obtén la ruta del directorio actual (__dirname)
const directorioActual = __dirname;

// Construye la ruta completa para el archivo error.log
const rutaErrorLog = path.join(directorioActual, '..', 'error.log');

// Función para escribir en el archivo de log
const writeToLog = (error) => {
    const timestamp = new Date().toISOString();
    const logMessage = `[${timestamp}] ${error}\n`;

    fs.appendFile(rutaErrorLog, logMessage, (err) => {
        if (err) {
            console.error(`Error al escribir en el archivo de log: ${err}`);
        }
    });
};

/* Ejemplo de uso
try {
    // Código que podría generar un error
    throw new Error('Este es un error de ejemplo.');
} catch (error) {
    // Manejo del error y escritura en el archivo de log
    console.error(`Error: ${error.message}`);
    writeToLog(error.stack);
}
*/

module.exports = writeToLog;