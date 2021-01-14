import jwt from 'jsonwebtoken';
import config from '../config'
import Role from '../models/roles';
import user from '../models/user';

interface IPayload{
    _id: string;
    iat: number;
    exp: number;
}

export const verifyToken = async (req: any, res: any , next: any) => {
    try{
        const token = req.header('x-access-token');

    if(!token){
        return res.status(403).json({messagge: "No se entregó un token"});
    }

    const decoded = jwt.verify(token, config.SECRET) as IPayload;
    req.userId = decoded._id;

    const usuario = await user.findById(req.userId, {password:0});

    if(!usuario)
        return res.status(404).json({messagge: 'no se encontro usuario'});

    next();
    
    }catch(err){
        return res.status(401).json({messagge: "No autorizado"});
    }
}

export const isModerador = async (req: any, res: any , next: any) => {
    console.log(req.userId);
    const usuario = await user.findById(req.userId);

    var roles: any = null;
    if(usuario !== null){
        roles = await Role.find({_id: {$in: usuario.roles}});    
        for(let i=0; i < roles.length; i++){
            const rol = roles[i];
            if(rol.name === "moderador"){
                next();
                return;
            }
        }
    }

    return res.status(403).json({messagge: "Se requiere rol de moderador"});
}

export const isAdmin = async (req: any, res: any , next: any) => {
    console.log(req.userId);
    const usuario = await user.findById(req.userId);

    var roles: any = null;
    if(usuario !== null){
        roles = await Role.find({_id: {$in: usuario.roles}});    
        for(let i=0; i < roles.length; i++){
            const rol = roles[i];
            if(rol.name === "admin"){
                next();
                return;
            }
        }
    }

    return res.status(403).json({messagge: "Se requiere rol de administrador"});
}