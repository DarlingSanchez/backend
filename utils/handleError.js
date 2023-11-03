const handleHttpError = (res, error) => {
    console.log("Error", error);
    res.status(403);
    res.send({ error });
};

const handleErrorResponse = (res, message = "Algo ocurrio", code = 401) => {
    console.log("Error", message);
    res.status(code);
    res.send({ error: message });
};

module.exports = { handleHttpError, handleErrorResponse };