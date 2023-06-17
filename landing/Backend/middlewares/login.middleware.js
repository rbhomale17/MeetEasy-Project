
const bcrypt = require("bcrypt");
const { UserModel } = require("../models/user.model");

const loginMiddleware = async (req, res, next) => {
    const { email, password } = req.body;
    try {
        const user = await UserModel.findOne({ email });
        // console.log(user);
        if (user) {
            bcrypt.compare(password, user.password, async function (err, result) {
                if (!result) res.send({ msg: "Wrong Password" });
                else {
                    next();
                }
            });
        }else{
            res.send({ msg: "User Not Found. Try to Register First" });
        }
    } catch (error) {
        res.send({ err: error.message });
    }
};

module.exports = { loginMiddleware }