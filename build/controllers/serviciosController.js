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
exports.serviciosController = void 0;
const database_1 = __importDefault(require("../database"));
class ServiciosController {
    list(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            (yield database_1.default).query('SELECT * FROM mst_servicios inner join mst_servicios_idioma on se_codservicio = si_codservicio where se_activo = ' + (yield database_1.default).escape('S'), function (error, results, fields) {
                if (error)
                    throw error;
                res.json(results);
            });
        });
    }
    getOne(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { id } = req.params;
            var sql = 'SELECT * FROM mst_servicios inner join mst_servicios_idioma on se_codservicio = si_codservicio WHERE se_codservicio = ' + (yield database_1.default).escape(id);
            (yield database_1.default).query(sql, function (error, results, fields) {
                if (error)
                    throw error;
                res.json(results);
            });
        });
    }
    create(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            console.log(req.body);
            (yield database_1.default).query('INSERT INTO mst_servicios set ?', [req.body]);
            res.json({ text: 'Servicios guardado!' });
        });
    }
    delete(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            (yield database_1.default).query('UPDATE mst_servicios set se_activo = ? where se_codservicio = ?', ['N', req.params.id]);
            res.json({ text: 'se borro el servicio ' + req.params.id });
        });
    }
    update(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            (yield database_1.default).query('UPDATE mst_servicios set ? where se_codservicio = ?', [req.body, req.params.id]);
            res.json({ text: 'actualizando el servicio ' + req.params.id });
        });
    }
}
exports.serviciosController = new ServiciosController();
