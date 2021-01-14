"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const middlewares_1 = require("../middlewares");
const superFamiliasController_1 = require("../controllers/superFamiliasController");
class SuperFamiliassRoutes {
    constructor() {
        this.router = express_1.Router();
        this.config();
    }
    config() {
        this.router.get('/', superFamiliasController_1.superFamiliasController.list);
        this.router.get('/:id', superFamiliasController_1.superFamiliasController.getOne);
        this.router.post('/', [middlewares_1.authJwt.verifyToken, middlewares_1.authJwt.isModerador], superFamiliasController_1.superFamiliasController.create);
        this.router.delete('/:id', [middlewares_1.authJwt.verifyToken, middlewares_1.authJwt.isAdmin], superFamiliasController_1.superFamiliasController.delete);
        this.router.put('/:id', [middlewares_1.authJwt.verifyToken, middlewares_1.authJwt.isAdmin], superFamiliasController_1.superFamiliasController.update);
    }
}
const superFamiliassroutes = new SuperFamiliassRoutes();
exports.default = superFamiliassroutes.router;
