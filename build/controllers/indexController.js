"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.indexController = void 0;
class IndexController {
    index(req, res) {
        res.json({
            Nombre: process.env.npm_package_name,
            version: process.env.npm_package_version
        });
    }
}
exports.indexController = new IndexController();
