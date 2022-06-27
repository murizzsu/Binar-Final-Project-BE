const express = require("express");
const cors = require("cors");
const app = express();
const controllers = require("./controllers");
const swaggerUI = require("swagger-ui-express");
const migrator = require("./migrator");

const {  PORT = 8000 } = process.env;

migrator();
app.use(cors());
app.use(express.json());

// users
app.post("/api/v1/login", controllers.login);
app.post("/api/v1/register", controllers.register);

// products
app.post("/api/v1/products", controllers.authenticator, controllers.productPost);
app.get("/api/v1/products", controllers.productGet);
app.get("/api/v1/products/:id", controllers.productGetByID);
app.put("/api/v1/products/:id", controllers.authenticator, controllers.productPut);
app.delete("/api/v1/products/:id", controllers.authenticator, controllers.productDelete);


// https://www.npmjs.com/package/swagger-ui-express
const options = {
    swaggerOptions: {
        url: "/api-docs"
    }
};
app.use("/docs", swaggerUI.serve, swaggerUI.setup(null, options));
app.get("/api-docs", (req, res) => {
    res.sendFile(__dirname + "/swagger.yaml");
});

app.listen(PORT, () => console.log(`Server is listening on PORT ${PORT}`));
