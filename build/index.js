"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
//importo el modulo express y su tipo de dato Application 
const express_1 = __importDefault(require("express"));
const morgan_1 = __importDefault(require("morgan"));
const cors_1 = __importDefault(require("cors"));
const initSetup_1 = require("./libs/initSetup");
const index_routes_1 = __importDefault(require("./routes/index-routes"));
const servicios_routes_1 = __importDefault(require("./routes/servicios-routes"));
const familias_routes_1 = __importDefault(require("./routes/familias-routes"));
const super_familias_routes_1 = __importDefault(require("./routes/super-familias-routes"));
const auth_routes_1 = __importDefault(require("./routes/auth-routes"));
require("./mdatabase");
class Server {
    constructor() {
        //inicializo express 
        this.app = express_1.default();
        this.config();
        this.routes();
    }
    //funcion para configurar el servidor
    config() {
        //creamos la variable 'port' para que sea la que un servicio me da, ej keroku o sino 3000
        this.app.set('port', process.env.PORT || 3000);
        this.app.use(morgan_1.default('dev'));
        this.app.use(cors_1.default());
        //en angular te mandan datos en formato json y el server manda en json tambien, para esto se usa esta linea
        this.app.use(express_1.default.json());
        //esta linea es para queramos enviar datos de un formulario html
        this.app.use(express_1.default.urlencoded({ extended: false }));
        //creo los roles en la base de datos, en caso de necesitar mas debo borrarlos de la misma y volve a agregar todos
        initSetup_1.createRoles();
    }
    //funcion para definir las rutas del servidor
    routes() {
        this.app.use('/', index_routes_1.default);
        this.app.use('/api/servicios', servicios_routes_1.default);
        this.app.use('/api/familias', familias_routes_1.default);
        this.app.use('/api/superFamilias', super_familias_routes_1.default);
        this.app.use('/api/auth', auth_routes_1.default);
    }
    //funcion para inicializar el servidor, para que empiece el server
    start() {
        this.app.listen(this.app.get('port'), () => {
            console.log('Servidor escuchando en puerto ', this.app.get('port'));
        });
    }
}
const server = new Server();
server.start();
