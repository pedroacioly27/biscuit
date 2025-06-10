require("dotenv").config();
const express = require("express");
const cors = require("cors");
// const routes = require("../routes/index");
const orders = require("./controllers/orders");
const serverless = require("serverless-http");

const app = express();
app.use(express.json());
app.use(cors());

app.get("/", orders.getOrders);
app.get("/description/:id", orders.getDescriptions);
app.get("/title/description/:title", orders.getDescriptionsTitle);
app.post("/", orders.postOrder);
app.post("/description", orders.postDescription);
app.delete("/:id", orders.deleteOrders);
app.delete("/description/:id", orders.deleteDescription);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Servidor rodando na porta ${PORT}`));

module.exports = serverless(app);
