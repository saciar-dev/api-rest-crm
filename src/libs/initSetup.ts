import Role from '../models/roles'

export const createRoles = async () => {

    try {
        //sino hay roles creados (count = 0) crear los roles si no hacer nada
        const count = await Role.estimatedDocumentCount();

        if (count > 0) {
            return;
        }
        //guardo en la BD todos los roles a la vez con Promise.all
        const values = await Promise.all([
            new Role({ name: 'usuario' }).save(),
            new Role({ name: 'moderador' }).save(),
            new Role({ name: 'admin' }).save()
        ]);

        console.log(values);
    } catch (error) {
        console.log(error);
    }

}