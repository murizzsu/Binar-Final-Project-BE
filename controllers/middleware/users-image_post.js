const { USER_STORAGE } = require('../../config/cloudinaryStorage');
const { Error4xx, Error500 } = require('../../helpers/response/error');
const { Users } = require('../../models');
const { removeFileInCloudinary } = require('../../helpers/cloudinary/destroy');
const { Success200 } = require('../../helpers/response/success');

const NewResponseUserImages = (images) => {
    images = images.map(image => ({
        image_url: image.image_url,
        user_id: image.userId,
    }));               
                                                    
    return images;
};         

/**
 *  [
 *     {
 *         "image_url": "",
 *         "user_id": 1
 *     },
 *  ]
 */

 async function usersImagePost(req, res) {
    try {
        const { id: userId } = req.user;

        const images = req.file?.map(file => ({
            image_url: file.path,
            user_id: userId
        }));

        const user = await Users.findOne({
            where: {
                id: userId,
            },
        });
        if (user){
            if (user === userId){
                const insertedImages = user.images;
                await removeFileInCloudinary(USER_STORAGE, insertedImages);
                
                if (insertedImages.length > 0){
                    await Users.destroy({
                        where: {
                            user_id: userId,
                        }
                    });
                }
    
                const imageCreated = await Users.bulkCreate(images);
                return Success200(res, NewResponseUserImages(imageCreated));
            }
            return Error4xx(res, 403, "You are not the owner of this account");
        }
        return Error4xx(res, 404, "Account not found");

        
    } catch (err) {
        return Error500(res, err.message);
    }
}

module.exports = usersImagePost;