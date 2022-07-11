const { Products, Users, Categories, Images } = require("../../models");
const { OPEN_FOR_BID_PRODUCT, WAITING_FOR_BID_PRODUCT, SOLD_PRODUCT } = require('../../helpers/database/enums');
const { Success200 } = require("../../helpers/response/success");
const { Error500 } = require("../../helpers/response/error");
const { Op } = require("sequelize");

const newMultipleProductsResponse = (products) => (
  products.map(product => ({
    id: product.id,
    name: product.name,
    price: product.price,
    description: product.description,
    status: product.status,
    category: {
      id: product.category.id,
      name: product.category.name
    },
    owner: {
      id: product.user.id,
      name: product.user.name,
      city: product.user.city,
      address: product.user.address,
      phone: product.user.phone
    },
    images: product.images.map(image => ({
      id: image.id,
      name: image.name,
    }))
  }))
)

async function productGet(req, res) {
  try {
    let queryProducts = {}
    let queryImages = {}
    let queryUsers = {}
    let queryCategories = {}

    const whitelistStatusProducts = [OPEN_FOR_BID_PRODUCT, WAITING_FOR_BID_PRODUCT, SOLD_PRODUCT]
    const { excludeStatusProduct, excludeUserId, statusProduct, category, user_id } = req.query


    if (whitelistStatusProducts.includes(statusProduct)){
      queryProducts = { ...queryProducts, status: statusProduct }
    }

    if (user_id){
      queryProducts = { ...queryProducts, user_id: user_id }
    }

    if (excludeStatusProduct){
      queryProducts = { ...queryProducts, status: { [Op.not]: excludeStatusProduct }}
    }

    if (excludeUserId){
      queryProducts = { ...queryProducts, user_id: { [Op.not]: excludeUserId }}
    }

    if (category){
      queryCategories = { ...queryCategories, name: category }
    }


    console.log(queryCategories)

    const products = await Products.findAll({
      where: queryProducts,
      include: [
        {
          model: Images,
          as: "images",
          where: queryImages,
          order: [['id', 'ASC']]
        }, {
          model: Users,
          as: "user",
          where: queryUsers
        }, {
          model: Categories,
          as: "category",
          where: queryCategories
        }
      ],
      order: [['id', 'DESC']]
    })
    // const productsList = await Products.findAll({ where: { status: OPEN_FOR_BID } });
    // const imagesList = await Images.findAll();
    
    // const products = [];

    // for (let i in productsList) {
    //   const userProduct = await Users.findByPk(productsList[i].user_id);
    //   const categoryProduct = await Categories.findByPk(productsList[i].category_id);

    //   let data = {};

    //   if (categoryProduct) {
    //     data = {
    //       id: productsList[i].id,
    //       user_name: userProduct.name,
    //       category: categoryProduct.name,
    //       name: productsList[i].name,
    //       price: productsList[i].price,
    //       description: productsList[i].description,
    //       status: productsList[i].status,
    //       images: [],
    //     };
    //   } else {
    //     data = {
    //       id: productsList[i].id,
    //       user_name: userProduct.name,
    //       category: "Kategori tidak ada",
    //       name: productsList[i].name,
    //       price: productsList[i].price,
    //       description: productsList[i].description,
    //       status: productsList[i].status,
    //       images: [],
    //     };
    //   }

    //   for (let j in imagesList) {
    //     if (imagesList[j].product_id == productsList[i].id) {
    //       data.images.push(imagesList[j].name);
    //     }
    //   }
    //   products.push(data);
    // } 
    return Success200(res, newMultipleProductsResponse(products))
  } catch (err) {
    console.log(err)
    return Error500(res, err)
  }
}

module.exports = productGet;  