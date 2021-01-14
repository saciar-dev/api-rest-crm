import {Router} from 'express'
import {signUp, signIn} from '../controllers/authController';

class AuthRoutes{
    public router: Router = Router();

    constructor() {
        this.config();
    }

    config(){
        this.router.post('/signup', signUp);
        this.router.post('/signin', signIn);
    }

}

const authRoutes = new AuthRoutes();
export default authRoutes.router;