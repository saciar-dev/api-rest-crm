import {Schema, model} from 'mongoose';

export const ROLES = ["admin", "moderador", "usuario"];

const roleSchema = new Schema({
    name: String
},
{
    versionKey: false
})

export default model("Role", roleSchema);