require("dotenv").config();
const express = require("express");
const cors = require("cors");
// const routes = require("../routes/index");
const orders = require("./controllers/orders");
const serverless = require("serverless-http");

const app = express();
app.use(express.json());
app.use(cors());

routes.get("/", orders.getOrders);
routes.get("/description/:id", orders.getDescriptions);
routes.get("/title/description/:title", orders.getDescriptionsTitle);
routes.post("/", orders.postOrder);
routes.post("/description", orders.postDescription);
routes.delete("/:id", orders.deleteOrders);
routes.delete("/description/:id", orders.deleteDescription);

module.exports = app;
module.exports.handler = serverless(app);
