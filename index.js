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


app.use("/api/v1", require("./routes"));

app.listen(port, () => {
    console.log("My port: " + port);
});

dbConnectMySQL();