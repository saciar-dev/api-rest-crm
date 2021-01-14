import { ROLES } from "../models/roles"

export const shckRolesExisted = (req: any, res: any, next:any) => {
    if(req.body.roles){
        for(let i=0; i<req.body.roles.length; i++){
            if(!ROLES.includes(req.body.roles[i])){
                return res.status(400).json({messagge: `Rol ${req.body.roles[i]} no existe` })
            }

        }
    }
}