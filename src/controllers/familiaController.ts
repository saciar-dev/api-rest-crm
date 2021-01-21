import { Request, Response} from 'express';

import pool from '../database';

class FamiliaController {

    public async listFamilias (req: Request, res: Response){

        (await pool).query('SELECT * FROM mst_fam_servicios where activo = '+ (await pool).escape('S'), function (error: any, results: JSON, fields: any) {
            if (error) throw error;
            res.json(results);
        });

    }

    public async getOne (req: Request,res: Response): Promise<any> {

        const { id } = req.params;

        var sql = 'SELECT * FROM mst_fam_servicios WHERE fs_codfamilia = ' + (await pool).escape(id)+ ' and activo = '+ (await pool).escape('S');
        (await pool).query(sql, function (error: any, results: string[], fields: any) {
            if (error) throw error;
            if(results.length > 0){
                return res.json(results[0]);
            }
            res.status(404).json({text: "la familia no existe"});
          });

    }

    public async listFamiliasBySuper (req: Request, res: Response){

        const { id } = req.params;

        var sql = 'SELECT f.* FROM mst_fam_servicios f inner join mst_familias_superfamilias on fs_codfamilia = id_familia WHERE activo = '+ (await pool).escape('S') +' and id_super_familia = ' + (await pool).escape(id);
        (await pool).query(sql, function (error: any, results: JSON, fields: any) {
            if (error) throw error;
            res.json(results);
          });

    }

    public async update(req: Request, res: Response) {
        (await pool).query('UPDATE mst_fam_servicios set ? where fs_codfamilia = ?',[req.body,req.params.id]);
        res.json({text: 'Familia actualizada: ' + req.params.id });
    }

}

export const familiaController =  new FamiliaController();