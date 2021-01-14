import {Schema, model, Document} from 'mongoose';
import bcrypt from 'bcryptjs';

export interface IUsuario extends Document{
    username: string,
    email: string,
    password: string,
    roles: any[],
    encryptPassword(pass: string): Promise<string>,
    validatePassword(pass: string, hashPass: string): Promise<boolean>
}

const userSchema = new Schema ({
    username: {
        type:String,
        required: true,
        min: 4,
        lowercase: true
    },
    email:{
        type: String,
        unique:true,
        required: true,
        lowercase: true
    },
    password:{
        type: String,
        required:true
    },
    roles: [{
        ref: "Role",
        type: Schema.Types.ObjectId
    }]
},{
    timestamps: true,
    versionKey: false,
});

userSchema.methods.encryptPassword = async (pass: string): Promise<string> => {
    const salt = await bcrypt.genSalt(10);
    return await bcrypt.hash(pass, salt);
};

userSchema.methods.validatePassword = async function (pass: string, hashPass: string): Promise<boolean> {
   return await bcrypt.compare(pass, hashPass);
};

export default model<IUsuario>("User",userSchema);