const express = require("express");
const orders = require("../controllers/orders.js");

const routes = express();

routes.get("/", orders.getOrders);
routes.delete("/:id", orders.deleteOrders);
routes.delete("/description/:id", orders.deleteDescription);

module.exports = routes;
