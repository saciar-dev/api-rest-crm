import mongoose from 'mongoose';

mongoose.connect("mongodb+srv://root:R55Gt9Bf@cluster0.oyjje.mongodb.net/userdb?retryWrites=true&w=majority", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify:true,
    useCreateIndex: true
})
    .then(db => console.log("Base mongo conectada"))
    .catch(err => console.log(err))