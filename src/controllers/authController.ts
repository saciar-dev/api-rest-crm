import {Request, Response} from 'express';
import User, {IUsuario} from '../models/user';
import jwt from 'jsonwebtoken';
import config from '../config';
import Role from '../models/roles';

export const signUp = async (req: Request, res: Response) => {

    //creo un nuevo usuario
    const usuario: IUsuario = new User({
        username: req.body.username,
        email: req.body.email,
        password: req.body.password,
        roles: req.body.roles
    });
    //guardo la contraseña cifrada en el nuevo usuario
    usuario.password = await usuario.encryptPassword(usuario.password);

    if(req.body.roles){
        const foundRoles = await Role.find({name: {$in: req.body.roles}});
        usuario.roles = foundRoles.map(role => role._id);
    }
    else{
        const role = await Role.findOne({name: "usuario"});
        if(role !== null)
            usuario.roles = [role._id];
    }

    //lo guardo en la BD
    const savedUser = await usuario.save();

    // genero token
    
    const token: string = jwt.sign({_id: savedUser._id}, config.SECRET, {
        expiresIn: 86400 // todo un dia
    })

    //res.header('authToken', token).json(savedUser);

    res.json({token});

}

export const signIn = async (req: Request, res: Response) => {

    //el populate es para que me devuelva el array de roles completo y no solo el _id
    const userFound = await User.findOne({email:req.body.email}).populate("roles");

    if(!userFound){
       return res.status(400).json({messagge: "Usuario no encontrado"});
    }

    //creo un nuevo usuario
    const usuario: IUsuario = new User({
        username: req.body.username,
        email: req.body.email,
        password: req.body.password,
        roles: req.body.roles
    });
    //guardo la contraseña cifrada en el nuevo usuario
    const matchPass = await usuario.validatePassword(req.body.password, userFound.password);

    if(!matchPass){
        return res.status(401).json({messagge: "Contraseña invalida" });
    }

    const token: string = jwt.sign({_id: userFound._id}, config.SECRET, {
        expiresIn: 86400 // todo un dia
    })

    res.json({token: token});
}