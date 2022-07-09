const cloudinary = require("cloudinary").v2;
const { ROOT_STORAGE } = require("../../config/cloudinaryStorage")

const removeManyFilesInCloudinary = async (foldername, files) => {
    return new Promise(async (resolve, reject) => {
        try{
            for (let index = 0; index < files.length; index++) {
                const file = files[index].name.split('/').pop()
                const filename = file.split(".")[0] 
                await removeFileInCloudinary(foldername, filename)
            }
            resolve()
        } catch(err){
            reject(err)
        }
    })
}


const removeFileInCloudinary = (foldername, filename) => {
    return new Promise((resolve, reject) => {
        cloudinary.uploader.destroy(`${ROOT_STORAGE}/${foldername}/${filename}`, (err, res) => {
            if (err){
                reject(err)
            }
            resolve(res)
        })
    })
}

module.exports = {
    removeManyFilesInCloudinary,
    removeFileInCloudinary
}
