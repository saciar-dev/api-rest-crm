"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const familiaController_1 = require("../controllers/familiaController");
class FamiliasRoutes {
    constructor() {
        this.router = express_1.Router();
        this.config();
    }
    config() {
        this.router.get('/', familiaController_1.familiaController.listFamilias);
        this.router.get('/superfamilia/:id', familiaController_1.familiaController.listFamiliasBySuper);
        this.router.put('/:id', familiaController_1.familiaController.update);
        this.router.get('/:id', familiaController_1.familiaController.getOne);
    }
}
const familiasroutes = new FamiliasRoutes();
exports.default = familiasroutes.router;
