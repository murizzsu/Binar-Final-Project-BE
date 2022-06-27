module.exports = {
    // Login
    login: require("./login"),

    // Register
    register: require("./register"),

    // Product
    productPost: require("./product_post"),
    productGet: require("./product_get"),
    productGetByID: require("./product_get_id"),
    productPut: require("./product_put"),
    productDelete: require("./product_delete"),

    // Encrypt and Decrpyt
    encryptPass: require("./encrypt_pass"),
    decryptPass: require("./decrypt_pass"),
    
    // Authenticator
    authenticator: require("./authenticator")
};
