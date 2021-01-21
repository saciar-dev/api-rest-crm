"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const serviciosController_1 = require("../controllers/serviciosController");
class ServiciosRoutes {
    constructor() {
        this.router = express_1.Router();
        this.config();
    }
    config() {
        this.router.get('/', serviciosController_1.serviciosController.list);
        this.router.get('/:id', serviciosController_1.serviciosController.getOne);
        this.router.post('/', serviciosController_1.serviciosController.create);
        this.router.put('/:id', serviciosController_1.serviciosController.update);
        this.router.delete('/:id', serviciosController_1.serviciosController.delete);
        this.router.get('/familia/:id', serviciosController_1.serviciosController.listServicioByFamilia);
    }
}
const serviciosroutes = new ServiciosRoutes();
exports.default = serviciosroutes.router;
