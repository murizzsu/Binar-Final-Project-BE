module.exports = {
    // Login
    login: require("./user/login"),

    // Register
    register: require("./user/register"),

    // Product
    productPost: require("./product/product_post"),
    productGet: require("./product/product_get"),
    productGetByID: require("./product/product_get_id"),
    productPut: require("./product/product_put"),
    productDelete: require("./product/product_delete"),

    // Encrypt and Decrpyt
    encryptPass: require("./encrypt-decrypt/encrypt_pass"),
    decryptPass: require("./encrypt-decrypt/decrypt_pass"),
    
    // Middleware
    authenticator: require("./middleware/authenticator"),
    imageUpload: require("./middleware/image_upload"),
    usersImagePost: require("./middleware/users-image_post"),
    productsImagePost: require("./middleware/products-image_post"),

    // User
    profil: require("./user/profil"),
    saleProduct: require("./user/product_sale"),
    soldProduct: require("./user/product_sold"),
    bidProduct : require("./user/product_bid"),
    currentUser: require("./user/current_user"),

    // Bids
    GetProductBid: require('./bids/get_product_bid'),
    CreateProductBid: require('./bids/create_product_bid')
};