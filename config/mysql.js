const { Sequelize } = require("sequelize");

const database = process.env.MYSQL_DATABASE;
const username = process.env.MYSQL_USER;
const password = process.env.MYSQL_PASSWORD;
const host = process.env.MYSQL_HOST;
const sequelize = new Sequelize(database, username, password, {
    host: host,
    dialect: "mysql",
});

const dbConnectMySQL = async() => {
    try {
        await sequelize.authenticate();
        console.log("MySQL connected");
    } catch (e) {
        console.log("MySQL ERROR connected", e);
    }
};

module.exports = { sequelize, dbConnectMySQL };




/*
const mysql = require('mysql');

// Configura los detalles de la conexión a la base de datos
const dbConfig = {
    host: 'localhost', // Cambia esto al host de tu base de datos
    user: 'root', // Cambia esto a tu nombre de usuario
    password: '', // Cambia esto a tu contraseña
    database: 'sistema_saas' // Cambia esto al nombre de tu base de datos
};

// Función para establecer la conexión a la base de datos
const dbConnect = () => {
    const connection = mysql.createConnection(dbConfig);

    connection.connect((err) => {
        if (err) {
            console.error('Error al conectar a la base de datos: ' + err.message);
        } else {
            console.log('Conexión a la base de datos MySQL establecida');
        }
    });

    /*connection.end((err) => {
        if (err) {
            console.error('Error al cerrar la conexión: ' + err.message);
        } else {
            console.log('Conexión a la base de datos MySQL cerrada');
        }
    });
}

// Exporta la función para que otros archivos puedan usarla
module.exports = dbConnect;*/