module.exports = {
    // Login
    login: require("./user/login"),

    // Register
    register: require("./user/register"),

    // Product
    GetAllCategories: require('./product/get_all_category'),
    GetWishlist: require('./product/get_wishlist'),
    productPost: require("./product/product_post"),
    productGet: require("./product/product_get"),
    productGetByID: require("./product/product_get_id"),
    productPut: require("./product/product_put"),
    productDelete: require("./product/product_delete"),
    UpdateProductStatus: require('./product/update_product_status'),
    
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
    notification: require("./user/notification"),
    updateNotification: require("./user/update_notification"),

    
    // Bids
    GetBids: require('./bids/get_bids'),
    GetProductBid: require('./bids/get_product_bid'),
    CreateProductBid: require('./bids/create_product_bid'),
    UpdateStatusBid: require('./bids/update_status_bid'),
};