import mongoose from 'mongoose';
import dotenv from 'dotenv';

dotenv.config();

if(process.env.MONGO_URL)
mongoose.connect(process.env.MONGO_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify:true,
    useCreateIndex: true
})
    .then(db => console.log("Base mongo conectada"))
    .catch(err => console.log(err))