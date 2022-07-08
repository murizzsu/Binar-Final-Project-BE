const jwt = require("jsonwebtoken");
const { Users } = require("../../models");


async function authenticator(req, res, next) {
    try {
        let header = req.headers.authorization.split("Bearer ")[1];
        console.log(header);
        let payload = jwt.verify(header, "s3cr3t");
        let user = await Users.findByPk(payload.id);
        if (user) {
            req.user = user
            next();
            return;
        } else {
            res.status(403).json({
                message: "Forbidden"
            });
            return;
        }
    } catch (err) {
        res.status(403).json({
            message: "Forbidden"
        });
        return;
    }

}

module.exports = authenticator;