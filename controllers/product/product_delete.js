const { Products } = require("../../models");
const jwt = require("jsonwebtoken");

async function productDelete(req, res) {
    try {
        let header = req.headers.authorization.split("Bearer ")[1];
        let user = jwt.verify(header, "s3cr3t");
        const idInput = req.params.id;
        const check = await Products.findByPk(idInput);
        console.log(check);
        if (check) {
            if (check.user_id == user.id) {
                await Products.destroy({ where: { id: idInput}});
                res.json({ message: `Product berhasil dihapus`});
            } else {
                res.json({ message: "Product tidak berhasil dihapus karena Anda bukan pemiliknya" });
            }
        } else {
            res.status(404).json({ message: "Product tidak ditemukan"});
        }
    } catch (err) {
        res.send(err);
    }
}

module.exports = productDelete;
