const jwt = require("jsonwebtoken");

const tokenSign = async(usuario) => {
    return jwt.sign({
            id: usuario.id,
            Rol_ID: usuario.Rol_ID,
            Nombre: usuario.Nombre,
        },
        process.env.JWT_SECRET, {
            expiresIn: "4h",
        }
    );
};

const verifyToken = async(token) => {
    try {
        return jwt.verify(token, process.env.JWT_SECRET);
    } catch (e) {
        return null;
    }
};

const decodeSign = (token) => {
    return jwt.decode(token, null);
};

module.exports = { tokenSign, decodeSign, verifyToken };