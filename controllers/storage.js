const fs = require("fs");
const { matchedData } = require("express-validator");
const { handleHttpError } = require("../utils/handleError");
const { storageModel } = require("../models");
const path = require('path');


//const optionsPaginate = require("../config/paginationParams");

const URL_PUBLIC = process.env.PUBLIC_URL || null;
const MEDIA_PATH = path.join(__dirname, '../storage');


const getItem = async(req, res) => {
    try {
        req = matchedData(req);
        const id = req.id;
        const data = await storageModel.findByPk(id)
        res.send({ data });
    } catch (e) {
        handleHttpError(res, e);
    }
};


const getItems = async(req, res) => {
    try {
        const [, options] = optionsPaginate(req)
        const data = await storageModel.paginate({}, options);
        res.send({ data });
    } catch (e) {
        handleHttpError(res, e);
    }
};


const createItem = async(req, res) => {
    const { file } = req;
    console.log("RUTAAAAAAA", MEDIA_PATH, file)
        //res.send({ a: 1 })
    try {
        const { file } = req;
        const body = {
            Url: `${URL_PUBLIC}/${file.filename}`,
            Nombre: file.filename,
        };
        const data = await storageModel.create(body);
        res.send(data);
    } catch (e) {
        handleHttpError(res, e);
    }
};

const deleteItem = async(req, res) => {

    try {
        req = matchedData(req);
        const id = req.id;
        const findMedia = await storageModel.findByPk(id)
        console.log(findMedia)
        const fileName = findMedia.Nombre;
        await storageModel.destroy({
            where: { id: id }
        });
        fs.unlinkSync(`${MEDIA_PATH}/${fileName}`);

        const data = {
            findMedia: fileName,
            deleted: true,
        };

        res.send({ data });
    } catch (e) {
        handleHttpError(res, e);
    }
};

module.exports = { getItems, getItem, createItem, deleteItem };