let mongoose=require("mongoose")
//require: importation
//required: 7aja obligatoire

let AdminSchema=new mongoose.Schema({
    nom:{
        type:String,
        required:true,
        trim: true,
    },
    email:{
        type: String,
        unique: true,
        required: true,
        lowercase: true,
        trim: true,
    },
    password:{
        type: String,
        required: true,
    },
    role:{
        type: String,
        default: "admin",
    },

});

module.exports=mongoose.model('admin',AdminSchema)