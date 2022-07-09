const { Products, Users, Categories, Images } = require("../../models");
const { OPEN_FOR_BID } = require('../../helpers/database/enums');

async function productGetByID(req, res) {
    try {
        const idInput = req.params.id;
        const product = await Products.findByPk(idInput, {
            where: { status: OPEN_FOR_BID },
        });

        if (product) {
            const userProduct = await Users.findByPk(product.user_id);
            const categoryProduct = await Categories.findByPk(product.category_id);

            let data = {};

            if (categoryProduct) {
                data = {
                    id: product.id,
                    user_name: userProduct.name,
                    category: categoryProduct.name,
                    name: product.name,
                    price: product.price,
                    description: product.description,
                    status: product.status,
                    images: [],
                };
            } else {
                data = {
                    id: product.id,
                    user_name: userProduct.name,
                    category: "Kategori tidak ada",
                    name: product.name,
                    price: product.price,
                    description: product.description,
                    status: product.status,
                    images: [],
                };
            }

            const imagesList = await Images.findAll({
                where: { product_id: data.id },
            });

            for (let j in imagesList) {
                data.images.push(imagesList[j].name);
            }
            res.send(data);
        } else {
            res.json({ message: "Barang tidak ditemukan" });
        }
    } catch (err) {
        res.send(err);
    }
}

module.exports = productGetByID;
