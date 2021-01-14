import {Request, Response} from 'express';

import pool from '../database';

class SuperFamiliaController{

    public async list (req: Request,res: Response) {

        (await pool).query('SELECT * FROM mst_super_familia where activo = '+ (await pool).escape('S'), function (error: any, results: JSON, fields: any) {
            if (error) throw error;
            res.json(results);
        });
    }

    public async getOne (req: Request,res: Response): Promise<any> {

        const { id } = req.params;

        var sql = 'SELECT * FROM mst_super_familia WHERE idt_super_familia = ' + (await pool).escape(id);
        (await pool).query(sql, function (error: any, results: JSON, fields: any) {
            if (error) throw error;
            res.json(results);
          });

    }

    public async create(req: Request, res: Response) {
        try{
            await (await pool).query('INSERT INTO mst_super_familia set ?',[req.body]);
            res.json({text: 'Servicio guardado!'}); 
        } catch (err){
            res.json(err);
        }
        
    }

    public async delete(req: Request, res: Response) {
        (await pool).query('UPDATE mst_super_familia set activo = ? where idt_super_familia = ?',['N',req.params.id]);

        res.json({text: 'se borro el servicio ' + req.params.id});
    }

    public async update(req: Request, res: Response) {
        (await pool).query('UPDATE mst_super_familia set ? where idt_super_familia = ?',[req.body,req.params.id]);
        res.json({text: 'actualizando el servicio ' + req.params.id});
    }

}

export const superFamiliasController = new SuperFamiliaController();