const { UserModel } = require('../models/user.model');
const bcrypt = require('bcrypt');
require('dotenv').config();
const {redis} = require('../database/redis');
const jwt = require('jsonwebtoken');


const register = async (req, res) => {

    let { name, email, password } = req.body
    try {
        let user = await UserModel.findOne({ email })
        if (user) {
            return res.status(400).send({ "msg": "already exist please login" })
        }
        const hash = bcrypt.hashSync(password, 6);
        let newuser = new UserModel({ name, email, password: hash, role: "User" })
        await newuser.save()
        return res.status(200).send({ "msg": "User registered successfully" })

    } catch (error) {
        return res.status(400).send(error)
    }
}

const login = async (req, res) => {

    const { email, password } = req.body;

    try {

        const user = await UserModel.findOne({ email })

        if (user) {

            bcrypt.compare(password, user.password, (err, result) => {

                if (result) {

                    const accessToken = jwt.sign({ userID: user._id, userRole: user.role }, process.env.AccessToken, { expiresIn: 60*60 })
                    const rerefreshToken = jwt.sign({ userID: user._id, userRole: user.role }, process.env.RerefreshToken, { expiresIn: '7d' })

                    res.cookie(`accessToken`, accessToken)
                    res.cookie(`rerefreshToken`, rerefreshToken)

                    res.status(200).send({ "success": true, msg: "login successfully" })

                } else {
                    return res.status(400).send({ "error": "Invalid Password" })
                }
            });

        } else {
            return res.status(400).send({ "msg": "User Not Found" })
        }

    } catch (error) {
        return res.status(400).send({ "error": error.message })
    }
}
const logout = async (req, res) => { 
    let token = req.cookies.accessToken;
    try {
        let decoded = jwt.verify(token, process.env.accessToken);
        redis.set(decoded.userID, token);
        res.status(200).send({message:"logged out successfully"});
    } catch (error) {
        res.status(400).send({error})
    }
}

module.exports = { register, login, logout }
