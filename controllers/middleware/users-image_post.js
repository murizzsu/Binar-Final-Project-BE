const { USER_STORAGE } = require('../../config/cloudinaryStorage');
const { Error4xx, Error500 } = require('../../helpers/response/error');
const { Users } = require('../../models');
const { removeFileInCloudinary } = require('../../helpers/cloudinary/destroy');
const { Success200 } = require('../../helpers/response/success');

async function usersImagePost(req, res) {
    try {
        const { id: userId } = req.user;
        console.log(req.file);
        const uploadedImage = req.file.path;

        const user = await Users.findOne({
            where: {
                id: userId,
            },
        });

        if (user){
            if (user.id === userId){
                const insertedImages = user.image_url;
                if (insertedImages){
                    const file = insertedImages.split('/').pop();
                    const filename = file.split(".")[0] ;
                    await removeFileInCloudinary(USER_STORAGE, filename);
                }
                
                await Users.update({
                    image_url: uploadedImage
                }, {
                    where: {
                        id: userId,
                    }
                });

                return Success200(res, "Succesfully updated image profile");
            }
            return Error4xx(res, 403, "You are not the owner of this account");
        }
        return Error4xx(res, 404, "Account not found");

        
    } catch (err) {
        console.log(err);
        return Error500(res, err.message);
    }
}

module.exports = usersImagePost;