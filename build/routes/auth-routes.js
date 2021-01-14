"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const authController_1 = require("../controllers/authController");
class AuthRoutes {
    constructor() {
        this.router = express_1.Router();
        this.config();
    }
    config() {
        this.router.post('/signup', authController_1.signUp);
        this.router.post('/signin', authController_1.signIn);
    }
}
const authRoutes = new AuthRoutes();
exports.default = authRoutes.router;
