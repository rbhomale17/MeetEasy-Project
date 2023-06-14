const express = require("express");
require('dotenv').config();
const cors = require('cors');
const cookieParser = require('cookie-parser');



const { connection } = require("./database/db");
const {redis} = require("./database/redis");
const {userRoute}=require("./routes/user.route")

const app = express();
app.use(express.json());
app.use(cors());
app.use(cookieParser());


app.use("/user",userRoute)

app.all("*",(req,res)=>{
    res.status(404).send({
        "error": `404 ! Invalid URL Detected.`
    })
})

app.listen(process.env.port,async()=>{
    try {
        await connection
        console.log("db is connected");
    } catch (error) {
        console.log(error.message)
    }
    console.log(`server is running at port ${process.env.port}`);
})