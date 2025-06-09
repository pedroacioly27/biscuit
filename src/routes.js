const express = require("express");
const orders = require("./controllers/orders.js");

const routes = express();

routes.get("/", orders.getOrders);
routes.get("/description/:id", orders.getDescriptions);
routes.get("/title/description/:title", orders.getDescriptionsTitle);
routes.post("/", orders.postOrder);
routes.post("/description", orders.postDescription);
routes.delete("/:id", orders.deleteOrders);
routes.delete("/description/:id", orders.deleteDescription);

module.exports = routes;
