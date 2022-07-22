const { Products, Users, Categories, Images } = require("../../models");
const { OPEN_FOR_BID_PRODUCT, SOLD_PRODUCT } = require('../../helpers/database/enums');
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
);

async function productGet(req, res) {
  try {
    let queryProducts = {};
    let queryImages = {};
    let queryUsers = {};
    let queryCategories = {};

    const whitelistStatusProducts = [OPEN_FOR_BID_PRODUCT, SOLD_PRODUCT];
    const { search, excludeStatusProduct, excludeUserId, statusProduct, category, user_id } = req.query;

    if (whitelistStatusProducts.includes(statusProduct)){
      queryProducts = { ...queryProducts, status: statusProduct };
    }

    if (search){
      queryProducts = { ...queryProducts, name: { [ Op.iLike ]: `%${search}%` } };
    }

    if (user_id){
      queryProducts = { ...queryProducts, user_id: Number(user_id) };
    }

    if (excludeStatusProduct){
      queryProducts = { ...queryProducts, status: { [Op.not]: excludeStatusProduct }};
    }

    if (excludeUserId){
      queryProducts = { ...queryProducts, user_id: { [Op.not]: Number(excludeUserId) }};
    }

    if (category){
      queryCategories = { ...queryCategories, name: category };
    }

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
    });
    return Success200(res, newMultipleProductsResponse(products));
  } catch (err) {
    console.log(err);
    return Error500(res, err);
  }
}

module.exports = productGet;  