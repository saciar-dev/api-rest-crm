"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.shckRolesExisted = void 0;
const roles_1 = require("../models/roles");
const shckRolesExisted = (req, res, next) => {
    if (req.body.roles) {
        for (let i = 0; i < req.body.roles.length; i++) {
            if (!roles_1.ROLES.includes(req.body.roles[i])) {
                return res.status(400).json({ messagge: `Rol ${req.body.roles[i]} no existe` });
            }
        }
    }
};
exports.shckRolesExisted = shckRolesExisted;
