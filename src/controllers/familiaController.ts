import { Request, Response} from 'express';

import pool from '../database';

class FamiliaController {

    public async listFamilias (req: Request, res: Response){

        (await pool).query('SELECT * FROM mst_fam_servicios where activo = '+ (await pool).escape('S'), function (error: any, results: JSON, fields: any) {
            if (error) throw error;
            res.json(results);
        });

    }

    public async listFamiliasBySuper (req: Request, res: Response){

        const { id } = req.params;

        var sql = 'SELECT f.* FROM mst_fam_servicios f inner join mst_familias_superfamilias on fs_codfamilia = id_familia WHERE id_super_familia = ' + (await pool).escape(id);
        (await pool).query(sql, function (error: any, results: JSON, fields: any) {
            if (error) throw error;
            res.json(results);
          });

    }

}

export const familiaController =  new FamiliaController();