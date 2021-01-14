import {Request, Response} from 'express';

import pool from '../database';

class ServiciosController{

    public async list (req: Request,res: Response) {

        (await pool).query('SELECT * FROM mst_servicios inner join mst_servicios_idioma on se_codservicio = si_codservicio where se_activo = '+ (await pool).escape('S'), function (error: any, results: JSON, fields: any) {
            if (error) throw error;
            res.json(results);
        });
    }

    public async getOne (req: Request,res: Response): Promise<any> {

        const { id } = req.params;

        var sql = 'SELECT * FROM mst_servicios inner join mst_servicios_idioma on se_codservicio = si_codservicio WHERE se_codservicio = ' + (await pool).escape(id);
        (await pool).query(sql, function (error: any, results: JSON, fields: any) {
            if (error) throw error;
            res.json(results);
          });

    }

    public async create(req: Request, res: Response) {
        console.log(req.body);
        (await pool).query('INSERT INTO mst_servicios set ?',[req.body]);
        res.json({text: 'Servicios guardado!'}); 
    }

    public async delete(req: Request, res: Response) {
        (await pool).query('UPDATE mst_servicios set se_activo = ? where se_codservicio = ?',['N',req.params.id]);

        res.json({text: 'se borro el servicio ' + req.params.id});
    }

    public async update(req: Request, res: Response) {
        (await pool).query('UPDATE mst_servicios set ? where se_codservicio = ?',[req.body,req.params.id]);
        res.json({text: 'actualizando el servicio ' + req.params.id});
    }

}

export const serviciosController = new ServiciosController();

