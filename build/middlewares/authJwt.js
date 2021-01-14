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
exports.isAdmin = exports.isModerador = exports.verifyToken = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const config_1 = __importDefault(require("../config"));
const roles_1 = __importDefault(require("../models/roles"));
const user_1 = __importDefault(require("../models/user"));
const verifyToken = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const token = req.header('x-access-token');
        if (!token) {
            return res.status(403).json({ messagge: "No se entregó un token" });
        }
        const decoded = jsonwebtoken_1.default.verify(token, config_1.default.SECRET);
        req.userId = decoded._id;
        const usuario = yield user_1.default.findById(req.userId, { password: 0 });
        if (!usuario)
            return res.status(404).json({ messagge: 'no se encontro usuario' });
        next();
    }
    catch (err) {
        return res.status(401).json({ messagge: "No autorizado" });
    }
});
exports.verifyToken = verifyToken;
const isModerador = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    console.log(req.userId);
    const usuario = yield user_1.default.findById(req.userId);
    var roles = null;
    if (usuario !== null) {
        roles = yield roles_1.default.find({ _id: { $in: usuario.roles } });
        for (let i = 0; i < roles.length; i++) {
            const rol = roles[i];
            if (rol.name === "moderador") {
                next();
                return;
            }
        }
    }
    return res.status(403).json({ messagge: "Se requiere rol de moderador" });
});
exports.isModerador = isModerador;
const isAdmin = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    console.log(req.userId);
    const usuario = yield user_1.default.findById(req.userId);
    var roles = null;
    if (usuario !== null) {
        roles = yield roles_1.default.find({ _id: { $in: usuario.roles } });
        for (let i = 0; i < roles.length; i++) {
            const rol = roles[i];
            if (rol.name === "admin") {
                next();
                return;
            }
        }
    }
    return res.status(403).json({ messagge: "Se requiere rol de administrador" });
});
exports.isAdmin = isAdmin;
