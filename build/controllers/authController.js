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
exports.signIn = exports.signUp = void 0;
const user_1 = __importDefault(require("../models/user"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const config_1 = __importDefault(require("../config"));
const roles_1 = __importDefault(require("../models/roles"));
const signUp = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    //creo un nuevo usuario
    const usuario = new user_1.default({
        username: req.body.username,
        email: req.body.email,
        password: req.body.password,
        roles: req.body.roles
    });
    //guardo la contraseña cifrada en el nuevo usuario
    usuario.password = yield usuario.encryptPassword(usuario.password);
    if (req.body.roles) {
        const foundRoles = yield roles_1.default.find({ name: { $in: req.body.roles } });
        usuario.roles = foundRoles.map(role => role._id);
    }
    else {
        const role = yield roles_1.default.findOne({ name: "usuario" });
        if (role !== null)
            usuario.roles = [role._id];
    }
    //lo guardo en la BD
    const savedUser = yield usuario.save();
    // genero token
    const token = jsonwebtoken_1.default.sign({ _id: savedUser._id }, config_1.default.SECRET, {
        expiresIn: 86400 // todo un dia
    });
    //res.header('authToken', token).json(savedUser);
    res.json({ token });
});
exports.signUp = signUp;
const signIn = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    //el populate es para que me devuelva el array de roles completo y no solo el _id
    const userFound = yield user_1.default.findOne({ email: req.body.email }).populate("roles");
    if (!userFound) {
        return res.status(400).json({ messagge: "Usuario no encontrado" });
    }
    //creo un nuevo usuario
    const usuario = new user_1.default({
        username: req.body.username,
        email: req.body.email,
        password: req.body.password,
        roles: req.body.roles
    });
    //guardo la contraseña cifrada en el nuevo usuario
    const matchPass = yield usuario.validatePassword(req.body.password, userFound.password);
    if (!matchPass) {
        return res.status(401).json({ messagge: "Contraseña invalida" });
    }
    const token = jsonwebtoken_1.default.sign({ _id: userFound._id }, config_1.default.SECRET, {
        expiresIn: 86400 // todo un dia
    });
    res.json({ token: token });
});
exports.signIn = signIn;
