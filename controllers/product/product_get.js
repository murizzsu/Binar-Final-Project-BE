const { Products, Users, Categories, Images } = require("../../models");

async function productGet(req, res) {
  try {
    const productsList = await Products.findAll({ where: { sold: false } });
    // res.send(productsList);
    const imagesList = await Images.findAll();
    // console.log(productsList);
    const products = [];

    for (let i in productsList) {
      const userProduct = await Users.findByPk(productsList[i].user_id);
      const categoryProduct = await Categories.findByPk(productsList[i].category_id);

      let data = {};

      if (categoryProduct) {
        data = {
          id: productsList[i].id,
          user_name: userProduct.name,
          category: categoryProduct.name,
          name: productsList[i].name,
          price: productsList[i].price,
          description: productsList[i].description,
          sold: productsList[i].sold,
          images: [],
        };
      } else {
        data = {
          id: productsList[i].id,
          user_name: userProduct.name,
          category: "Kategori tidak ada",
          name: productsList[i].name,
          price: productsList[i].price,
          description: productsList[i].description,
          sold: productsList[i].sold,
          images: [],
        };
      }

      for (let j in imagesList) {
        if (imagesList[j].product_id == productsList[i].id) {
          data.images.push(imagesList[j].name);
        }
      }
      products.push(data);
    } 
    res.send(products);
  } catch (err) {
    res.send(err);
  }
}

module.exports = productGet;  