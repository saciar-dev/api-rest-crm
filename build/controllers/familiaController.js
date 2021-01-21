"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.familiaController = void 0;
const database_1 = __importDefault(require("../database"));
class FamiliaController {
    listFamilias(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            (yield database_1.default).query('SELECT * FROM mst_fam_servicios where activo = ' + (yield database_1.default).escape('S'), function (error, results, fields) {
                if (error)
                    throw error;
                res.json(results);
            });
        });
    }
    getOne(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { id } = req.params;
            var sql = 'SELECT * FROM mst_fam_servicios WHERE fs_codfamilia = ' + (yield database_1.default).escape(id) + ' and activo = ' + (yield database_1.default).escape('S');
            (yield database_1.default).query(sql, function (error, results, fields) {
                if (error)
                    throw error;
                if (results.length > 0) {
                    return res.json(results[0]);
                }
                res.status(404).json({ text: "la familia no existe" });
            });
        });
    }
    listFamiliasBySuper(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { id } = req.params;
            var sql = 'SELECT f.* FROM mst_fam_servicios f inner join mst_familias_superfamilias on fs_codfamilia = id_familia WHERE activo = ' + (yield database_1.default).escape('S') + ' and id_super_familia = ' + (yield database_1.default).escape(id);
            (yield database_1.default).query(sql, function (error, results, fields) {
                if (error)
                    throw error;
                res.json(results);
            });
        });
    }
    update(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            (yield database_1.default).query('UPDATE mst_fam_servicios set ? where fs_codfamilia = ?', [req.body, req.params.id]);
            res.json({ text: 'Familia actualizada: ' + req.params.id });
        });
    }
}
exports.familiaController = new FamiliaController();
