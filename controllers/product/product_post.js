const { Products, Images } = require("../../models");
const jwt = require("jsonwebtoken");

async function productPost(req, res) {
    try {
        let header = req.headers.authorization.split("Bearer ")[1];
        let user = jwt.verify(header, "s3cr3t");

        let productInput = {
            user_id: user.id,
            category_id: req.body.category_id,
            name: req.body.name,
            price: req.body.price,
            description: req.body.description,
        };

        const imageInput = req.body.image;

        const Product = await Products.create(productInput);

        if (Product) {
            for (let i in imageInput) {
                await Images.create({
                    name: imageInput[i],
                    product_id: Product.id
                });
            } 
            
            res.status(201).json({
                name: req.body.name,
                message: `Barang dengan ${productInput.name} berhasil dibuat`
                
             });
        } else {
            res.json({ 
                message: `Barang dengan ${productInput.name} tidak berhasil dibuat`
            });
        }


    } catch (err) {
        res.send(err);
    }
}


module.exports = productPost;