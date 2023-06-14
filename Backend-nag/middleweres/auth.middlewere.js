const jwt = require("jsonwebtoken");
const { redis } = require("../database/redis")


require("dotenv").config()

const auth = async (req, res, next) => {

    const token = req.cookies.accessToken

    if (token) {
        try {
            const decoded = jwt.verify(token, process.env.AccessToken);
            let redisValue = await redis.get(decoded.userID)

            if (token == redisValue) {

                return res.status(400).send({ "err": "Token is Blacklisted, Session Expired" })
            }
            req.body.userID = decoded.userID
            req.body.userRole = decoded.userRole

            next()

        } catch (error) {
            if (error.name === 'TokenExpiredError') {

                refreshcb(req, res, next);
            }
            else {
                return res.status(401).json({ "msg": `${error.message}` })
            }
        }
    }
    else {
        return res.status(400).send("please login first");
    }
}

const refreshcb = async (req, res, next) => {

    const refreshToken = req.cookies.rerefreshToken
    try {
        const decoded = jwt.verify(refreshToken, process.env.RerefreshToken);
        const accessToken = jwt.sign({ userID: decoded.userID, userRole: decoded.userRole }, process.env.AccessToken, { expiresIn: 2 })
        res.cookie(`accessToken`, accessToken)
        next()
    } catch (error) {
        console.log(error.message)
        if (error.name === 'TokenExpiredError') {
            return res.status(401).send(error);
        }
        return res.status(401).json({ "msg": `${error.message}` });
    }

}




module.exports = { auth };