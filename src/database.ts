import mysql from 'promise-mysql';

import keys from './keys';

const pool = mysql.createPool(keys.database);

pool.then((r: any) => r.getConnection().then((connection:any)=>{
    r.releaseConnection(connection);
    console.log('Conexion exitosa.')
    })
    .catch((err:any) => { 
        console.log('Error al conectar la base ' + err);
    })); 

export default pool;
    