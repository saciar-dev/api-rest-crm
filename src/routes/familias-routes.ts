import{ Router} from 'express';

import { familiaController }  from '../controllers/familiaController';

class FamiliasRoutes {
    public router: Router = Router();

    constructor() {
        this.config();
    }

    config(){
        
        this.router.get('/', familiaController.listFamilias);
        this.router.get('/superfamilia/:id', familiaController.listFamiliasBySuper);
        this.router.put('/:id', familiaController.update);
        this.router.get('/:id', familiaController.getOne);
    }
}

const familiasroutes = new FamiliasRoutes();
export default familiasroutes.router;