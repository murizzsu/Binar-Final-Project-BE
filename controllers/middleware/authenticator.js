const jwt = require("jsonwebtoken");
const { Users } = require("../../models");


async function authenticator(req, res, next) {
    try {
        let header = req.headers.authorization.split("Bearer ")[1];
        console.log(header);
        let user = jwt.verify(header, "s3cr3t");
        let check = await Users.findByPk(user.id);
        if (check) {
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
            message: err.message
        });
        return;
    }

}

module.exports = authenticator;