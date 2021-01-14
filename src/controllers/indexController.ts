import {Request, Response} from 'express';

class IndexController{

    public index (req: Request,res: Response) {
        res.json({
            Nombre: process.env.npm_package_name,
            version: process.env.npm_package_version
        });
    }

}

export const indexController = new IndexController();
