const { Products, Users, Categories, Images } = require("../../models");
const { OPEN_FOR_BID } = require('../../helpers/database/enums');
const { Success200 } = require("../../helpers/response/success");
const { Error4xx, Error500 } = require("../../helpers/response/error");

const newGetProductByIDResponse = (product) => ({
    id: product.id,
    name: product.name,
    price: product.price,
    description: product.description,
    status: product.status,
    owner: {
        id: product.user.id,
        name: product.user.name,
        city: product.user.city,
        image_url: product.user.image_url,
    },
    category: {
        id: product.category.id,
        name: product.category.name
    }, 
    images: product.images.map(product => product.name)
});

// {
//     "id": 7,
//     "user_id": 3,
//     "category_id": 2,
//     "name": "c",
//     "price": 151,
//     "description": "asda",
//     "status": "open_for_bid",
//     "createdAt": "2022-07-10T08:06:46.226Z",
//     "updatedAt": "2022-07-10T08:06:46.226Z",
//     "user": {
//         "id": 3,
//         "email": "kelvin@gmail.com",
//         "password": "$2b$10$UTG0tRDi8u76RoUocQ07VuaoF38ml3sz2DNcBqbchWmOZJoj9QWI2",
//         "image_id": null,
//         "name": "kelvin",
//         "city": null,
//         "address": null,
//         "phone": null,
//         "createdAt": "2022-07-10T07:57:30.235Z",
//         "updatedAt": "2022-07-10T07:57:30.235Z"
//     },
//     "category": {
//         "id": 2,
//         "name": "Kendaraan",
//         "createdAt": "2022-07-10T07:55:37.940Z",
//         "updatedAt": "2022-07-10T07:55:37.940Z"
//     }
// }
async function productGetByID(req, res) {
    try {
        const { id } = req.params;

        let queryProduct = {
            id,
        };

        let queryUser = {};

        let queryCategory = {};

        const product = await Products.findOne({
            where: queryProduct,
            include: [
                {
                    model: Users,
                    as: 'user',
                    where: queryUser,
                }, {
                    model: Categories,
                    as: 'category',
                    where: queryCategory
                }, {
                    model: Images,
                    as: 'images',
                }
            ]
        });
        if (product){
            return Success200(res, newGetProductByIDResponse(product));
        }
        return Error4xx(res, 404, "Product Not Found");
    } catch (err) {
        console.log(err);
        return Error500(res, err.message);
    }
}

module.exports = productGetByID;
