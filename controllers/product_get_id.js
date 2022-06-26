const { Products } = require("../models");

async function productGetByID(req, res) {
    try {
        const idInput = req.params.id;
        const product = await Products.findByPk(idInput, {
            where: { sold: false },
          });
      
        if (product) {
            let data = {
                id: product.id,
                category_id: product.category_id,
                name: product.name,
                price: product.price,
                description: product.description,
                img_url: product.img_url
            };
            res.send(data);

        } else {
            res.send("Data product tidak ada");
        }
    } catch (err) {
        res.send(err);
    }
}

module.exports = productGetByID;
