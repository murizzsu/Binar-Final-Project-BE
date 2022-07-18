const express = require("express");
const cors = require("cors");
const app = express();
const controllers = require("./controllers");
const swaggerUI = require("swagger-ui-express");
const { Bids, Products, Images } = require('./models');
var morgan = require('morgan');

const {  PORT = 8000 } = process.env;

app.use(cors());
app.use(express.urlencoded({extended: true}));
app.use(express.json());
app.use(morgan('tiny'));

// users
app.post("/api/v1/login", controllers.login);
app.post("/api/v1/register", controllers.register);
app.post("/api/v1/usersimageupload", controllers.authenticator, controllers.imageUpload.users, controllers.usersImagePost);
app.put("/api/v1/profil", controllers.authenticator, controllers.profil);
app.get("/api/v1/currentuser", controllers.authenticator, controllers.currentUser);
app.get("/api/v1/products/sold",controllers.authenticator,controllers.soldProduct);
app.get("/api/v1/products/sale",controllers.authenticator, controllers.saleProduct);
app.get("/api/v1/products/bid", controllers.authenticator, controllers.bidProduct);
app.get("/api/v1/notification",controllers.authenticator, controllers.notification);
<<<<<<< index.js
app.put("/api/v1/notification/:id", controllers.authenticator, controllers.UpdateNotification);
=======
app.put("/api/v1/notification/:id",controllers.authenticator,controllers.updateNotification);
>>>>>>> index.js

// products
app.get("/api/v1/categories", controllers.GetAllCategories);
app.get('/api/v1/products/wishlist', controllers.authenticator, controllers.GetWishlist);
app.post("/api/v1/products", controllers.authenticator, controllers.productPost);
app.post("/api/v1/productsimageupload", controllers.authenticator, controllers.imageUpload.products, controllers.productsImagePost);
app.get("/api/v1/products", controllers.productGet);
app.get("/api/v1/products/:id", controllers.productGetByID);
app.put("/api/v1/products/:id", controllers.authenticator, controllers.productPut);
app.put('/api/v1/products/:productId/status', controllers.authenticator, controllers.UpdateProductStatus);
app.delete("/api/v1/products/:id", controllers.authenticator, controllers.productDelete);

// bids
app.get('/api/v1/products/:productId/bids', controllers.authenticator, controllers.GetProductBid);
app.post('/api/v1/products/:productId/bids', controllers.authenticator, controllers.CreateProductBid);


app.get('/api/v1/bids', controllers.authenticator, controllers.GetBids);
app.post('/api/v1/bids/check', controllers.authenticator, controllers.CheckBids);
app.put('/api/v1/bids/:bidsId', controllers.authenticator, controllers.UpdateStatusBid);

// https://www.npmjs.com/package/swagger-ui-express
const options = {
    swaggerOptions: {
        url: "/api-docs"
    }
};
app.get("/", (req, res) => {
    res.status(200).json({
        status: "OK",
        message: "Running Success!",
      });
});
app.use("/docs", swaggerUI.serve, swaggerUI.setup(null, options));
app.get("/api-docs", (req, res) => {
    res.sendFile(__dirname + "/swagger.yaml");
});

// cloudinary.uploader.destroy(['binar-final-project/products/glucqezh4kj0std6htlj', 'binar-final-project/products/dubsuqiopbagsfwo5qeu'], (err, res) => console.log(res))
app.listen(PORT, () => console.log(`Server is listening on PORT ${PORT}`));
