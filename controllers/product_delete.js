const { Users } = require("../models");
const jwt = require("jsonwebtoken")

async function productDelete(req, res) {
    try {
        let header = req.headers.authorization.split("Bearer ")[1]
        let user = jwt.verify(header, "s3cr3t")
        let check = await Users.findOne({
            where: { id: req.params.id, role: "product" },
        });
        if (check) {
            await Users.update(
                { is_deleted: true },
                { where: { id: req.params.id } }
            );
            res.send("Data product berhasil dihapus");
            return
        }
    } catch (err) {
        res.send(err)
    }
}

module.exports = productDelete;
