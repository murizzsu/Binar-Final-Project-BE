const express = require("express");
const cors = require("cors");
const app = express();
const controllers = require("./controllers");
const swaggerUI = require("swagger-ui-express");

const {  PORT = 8000 } = process.env;

app.use(cors());
app.use(express.json());

// users
app.post("/api/v1/login", controllers.login);
app.post("/api/v1/register", controllers.register);
app.post("/api/v1/usersimageupload", controllers.authenticator, controllers.imageUpload.users, controllers.usersImagePost);
app.put("/api/v1/profil", controllers.authenticator, controllers.profil);
app.get("/api/v1/currentuser", controllers.authenticator, controllers.currentUser);
app.get("/api/v1/products/sold",controllers.authenticator,controllers.soldProduct);
app.get("/api/v1/products/sale",controllers.authenticator, controllers.saleProduct);
app.get("/api/v1/products/bid", controllers.authenticator, controllers.bidProduct);

// products
app.post("/api/v1/products", controllers.authenticator, controllers.productPost);
app.post("/api/v1/productsimageupload", controllers.authenticator, controllers.imageUpload.products, controllers.productsImagePost);
app.get("/api/v1/products", controllers.productGet);
app.get("/api/v1/products/:id", controllers.productGetByID);
app.put("/api/v1/products/:id", controllers.authenticator, controllers.productPut);
app.delete("/api/v1/products/:id", controllers.authenticator, controllers.productDelete);

// bids
app.get('/api/v1/products/:productId/bids', controllers.authenticator, controllers.GetProductBid,)
app.post('/api/v1/products/:productId/bids', controllers.authenticator, controllers.CreateProductBid,)


api.put('/api/v1/bids/:bidsId', controllers.authenticator, controllers.UpdateStatusBid)
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

app.listen(PORT, () => console.log(`Server is listening on PORT ${PORT}`));
