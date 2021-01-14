import{ Router} from 'express';

import { serviciosController } from '../controllers/serviciosController';

class ServiciosRoutes {
    public router: Router = Router();

    constructor() {
        this.config();
    }

    config(){
        this.router.get('/', serviciosController.list);
        this.router.get('/:id', serviciosController.getOne);
        this.router.post('/', serviciosController.create);
        this.router.put('/:id',serviciosController.update);
        this.router.delete('/:id',serviciosController.delete);
    }
}

const serviciosroutes = new ServiciosRoutes();
export default serviciosroutes.router;