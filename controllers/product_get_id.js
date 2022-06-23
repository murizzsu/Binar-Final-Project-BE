const { Users } = require("../models");

async function productGetByID(req, res) {
    try {
        let product = await Users.findOne({
            where: { id: req.params.id, sold: false },
        });

        if (product == null || product == undefined || product == "") {
            res.send("Data product tidak ada");
            return;
        } else {
            // res.status(201).json({
            //     id: product.id,
            //     category_id: product.category_id,
            //     name: product.name,
            //     price: product.price,
            //     description: product.description,
            //     img_url: product.img_url
            // });
            res.send(product);
            return;
        }
    } catch (err) {
        res.send(err);
    }
}

module.exports = productGetByID;
