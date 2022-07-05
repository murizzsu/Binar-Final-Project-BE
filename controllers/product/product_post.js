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
        // let img_urlInput = req.body.img_url;

        const Product = await Products.create(productInput);

        // await Products.create({
        //     user_id: user.id,
        //     category_id: categoryInput,
        //     name: nameInput,
        //     price: priceInput,
        //     description: descriptionInput,
        //     img_url: img_urlInput,
        //     created_by: user.id,
        //     updated_by: user.id
        // });

        if (Product) {
            for (let i in imageInput) {
                await Images.create({
                    name: imageInput[i],
                    product_id: Product.id
                });
            } 
            
            res.status(201).json({
                name: req.body.name,
                message: `Product dengan ${productInput.name} berhasil dibuat`
                
             });
        } else {
            res.json({ 
                message: `Product dengan ${productInput.name} tidak berhasil dibuat`
            });
        }


    } catch (err) {
        // console.log(err);
        res.send(err);
    }
}


module.exports = productPost;