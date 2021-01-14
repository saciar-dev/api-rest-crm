//importo el modulo express y su tipo de dato Application 
import express, {Application} from 'express';
import morgan from 'morgan';
import cors from 'cors';
import {createRoles} from './libs/initSetup'

import indexRoutes from './routes/index-routes';
import serviciosRoutes from './routes/servicios-routes';
import familiasRoutes from './routes/familias-routes';
import superFamiliasRoutes from './routes/super-familias-routes';
import authRoutes from './routes/auth-routes';

import './mdatabase';

class Server {
    
    //propiedad de la clase de tipo Application de express
    public app: Application;
    
    constructor(){
        //inicializo express 
        this.app = express();
        this.config();
        this.routes();
    }
    //funcion para configurar el servidor
    config(): void{
        //creamos la variable 'port' para que sea la que un servicio me da, ej keroku o sino 3000
        this.app.set('port', process.env.PORT || 3000);
        this.app.use(morgan('dev'));
        this.app.use(cors());
        //en angular te mandan datos en formato json y el server manda en json tambien, para esto se usa esta linea
        this.app.use(express.json());
        //esta linea es para queramos enviar datos de un formulario html
        this.app.use(express.urlencoded({extended: false}));
        //creo los roles en la base de datos, en caso de necesitar mas debo borrarlos de la misma y volve a agregar todos
        createRoles();
        
    }

    //funcion para definir las rutas del servidor
    routes(): void{
        this.app.use('/',indexRoutes);
        this.app.use('/api/servicios',serviciosRoutes);
        this.app.use('/api/familias',familiasRoutes);
        this.app.use('/api/superFamilias',superFamiliasRoutes);
        this.app.use('/api/auth', authRoutes);
    }

    //funcion para inicializar el servidor, para que empiece el server
    start(): void{
        this.app.listen(this.app.get('port'), () => {
            console.log('Servidor escuchando en puerto ', this.app.get('port'));
        });
    }
}

const server = new Server();
server.start();