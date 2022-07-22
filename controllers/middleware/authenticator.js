const jwt = require("jsonwebtoken");
const { Error4xx, Error500 } = require("../../helpers/response/error");
const { Users } = require("../../models");


async function authenticator(req, res, next) {
    try {
        let authToken = req.headers;
        if (authToken){
            let header = req.headers.authorization.split("Bearer ")[1];
            let payload = jwt.verify(header, "s3cr3t");
            let user = await Users.findByPk(payload.id);
            if (user) {
                req.user = user;
                next();
                return;
            } 
            return Error4xx(res, 404, "User Not Found");
        }
    } catch (err) {
        console.log(err);
        return Error500(res, err.message);
    }

}

module.exports = authenticator;