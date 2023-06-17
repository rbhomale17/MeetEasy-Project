// const { Binary } = require("mongodb");
const mongoose = require("mongoose")

// const mongoose = require("mongoose")

const userschema = mongoose.Schema({
    name:{type:String},
    email:{type:String},
    password:{type:String},
    picture:{type:Object},
    gender:{type:String,enum:["Female","Male"], default:"Male"},
    role:{type:String, default:'User',enum:["User","Admin"]}
},{
    versionKey:false
})

const UserModel = mongoose.model("newuser",userschema)

// module.exports={usermodel}
// const userSchema = mongoose.Schema({
//     name: { type: String },
//     email: { type: String },
//     password: { type: String },
//     picture: { type: String },
//     role: { type: String, required: true, default: "User", enum: ["User", "Admin"] }
// },
//     {
//         versionKey: false,
//         timestamps: true
//     })

// const UserModel = mongoose.model("user", userSchema);

module.exports = { UserModel };