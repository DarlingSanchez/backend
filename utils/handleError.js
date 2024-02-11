const writeToLog = require('./grabarError')
const handleHttpError = (res, error) => {
    console.log("Error", error);
    writeToLog(error)
    res.status(403);
    res.send({ "Message": "Error catch backend", "error": error });
};

const handleErrorResponse = (res, message = "Algo ocurrio", code = 401) => {
    console.log("Error", message);
    res.status(code);
    res.send({ error: message });
};

module.exports = { handleHttpError, handleErrorResponse };