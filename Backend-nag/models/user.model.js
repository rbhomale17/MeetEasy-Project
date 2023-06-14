const  mongoose  = require("mongoose")

const userSchema = mongoose.Schema({
    name:{type:String , required:[true,"name not present"]},
    email:{type:String , required:[true,"email not present"], unique:true},
    password: { type: String, required: [true, "password not present"] },
    role: { type: String, required: true , default:"User" , enum:["User","Admin"]}
},
{
    versionKey:false,
    timestamps:true
})

const UserModel = mongoose.model("User",userSchema);

module.exports = {UserModel};