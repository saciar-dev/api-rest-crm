import{ Router} from 'express';
import { authJwt } from '../middlewares'

import { superFamiliasController } from '../controllers/superFamiliasController';

class SuperFamiliassRoutes {
    public router: Router = Router();

    constructor() {
        this.config();
    }

    config(){
        this.router.get('/', superFamiliasController.list);
        this.router.get('/:id', superFamiliasController.getOne);
        this.router.post('/', [authJwt.verifyToken,authJwt.isModerador], superFamiliasController.create);
        this.router.delete('/:id', [authJwt.verifyToken,authJwt.isAdmin], superFamiliasController.delete);
        this.router.put('/:id', [authJwt.verifyToken,authJwt.isAdmin], superFamiliasController.update);
    }
}

const superFamiliassroutes = new SuperFamiliassRoutes();
export default superFamiliassroutes.router;