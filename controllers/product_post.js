const { Products } = require("../models");
const jwt = require("jsonwebtoken");

async function productPost(req, res) {
    try {
        let header = req.headers.authorization.split("Bearer ")[1];
        let user = jwt.verify(header, "s3cr3t");
        let categoryInput = req.body.category_id;
        let nameInput = req.body.name;
        let priceInput = req.body.price;
        let descriptionInput = req.body.description;
        let img_urlInput = req.body.img_url;
        console.log(req.body);
        await Products.create({
            user_id: user.id,
            category_id: categoryInput,
            name: nameInput,
            price: priceInput,
            description: descriptionInput,
            img_url: img_urlInput,
            created_by: user.id,
            updated_by: user.id
        });

        // if (product) {
        //     res.status(201).json({ message: `Product ${nameInput} berhasil dipasang`});
        // } else {
        //     res.status(424).json({ message: `Product ${nameInput} sudah ada`});
        // }

        res.status(201).json({
            name: req.body.name,
            price: req.body.price,
            description: req.body.description,
            img_url: req.body.img_url,
        });

    } catch (err) {
        console.log(err);
        res.send(err);
    }
}


module.exports = productPost;