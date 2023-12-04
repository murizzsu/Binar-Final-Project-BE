const { Error500 } = require('../../helpers/response/error');
const { Success200 } = require('../../helpers/response/success');
const { Categories } = require('../../models');

const newResponseCategories = (categories) => {
    return categories.map(category => ({
        id: category.id,
        name: category.name,
    }));
};


/**
 * [
 *   {
 *       "id": 1,
 *       "name": "Hobi"
 *   },
 *   {
 *       "id": 2,
 *       "name": "Kendaraan"
 *   },
 *   {
 *       "id": 3,
 *       "name": "Baju"
 *   },
 *   {
 *       "id": 4,
 *       "name": "Elektronik"
 *   },
 *   {
 *       "id": 5,
 *       "name": "Kesehatan"
 *   }
 * ]
 */
const GetAllCategories = async (req, res) => {
    try{
        const categories = await Categories.findAll();

        return Success200(res, newResponseCategories(categories));
    } catch(err){
        return Error500(res, err.message);
    }
    

    
};

module.exports = GetAllCategories;
