const express = require("express");
const app = express();
const multer = require("multer");
const cors = require("cors");

const cloudinary = require("cloudinary").v2;
const { CloudinaryStorage } = require("multer-storage-cloudinary");

// set config untuk bisa upload ke cloudinary (autentikasi)
cloudinary.config({
    cloud_name: 'djann8mt5', 
    api_key: '522411823264262', 
    api_secret: 'PsowJINmrDtWQabk3Q_A3e7mL0E' 
});

// create new instance untuk membuat custom storage menggunakan cloudinary
const usersStorage = new CloudinaryStorage({
    cloudinary: cloudinary, // instance dari SDK cloudinary yang sudah diset confignya
    params: { // untuk meng-custom file yang akan di upload
        folder: "binar-final-project/users", // 
        //   format: async (req, file) => 'png', // mau diconvert jadi extensi apa, misal .png, .jpeg
        //   public_id: (req, file) => 'computed-filename-using-request', // untuk membuat custom file name
    },
});

const productsStorage = new CloudinaryStorage({
    cloudinary: cloudinary, // instance dari SDK cloudinary yang sudah diset confignya
    params: { // untuk meng-custom file yang akan di upload
        folder: "binar-final-project/products", // 
        //   format: async (req, file) => 'png', // mau diconvert jadi extensi apa, misal .png, .jpeg
        //   public_id: (req, file) => 'computed-filename-using-request', // untuk membuat custom file name
    },
});

app.use(cors());

// inisiasi multernya
const UsersImageUpload = multer({ storage: usersStorage });
const ProductsImageUpload  = multer({ storage: productsStorage});

module.exports = {
    users : UsersImageUpload.single('file'),
    products : ProductsImageUpload.array('files',4),
};



