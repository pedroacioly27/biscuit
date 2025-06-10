require("dotenv").config();
const express = require("express");
const cors = require("cors");
const routes = require("../routes/index");
const serverless = require("serverless-http");

const app = express();
app.use(express.json());
app.use(cors());
app.use(routes);

app.listen(3000);

// module.exports = app;
// module.exports.handler = serverless(app);
