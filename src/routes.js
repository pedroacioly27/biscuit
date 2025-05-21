const express = require("express");
const knex = require("./connect.js");

const routes = express();

routes.get("/", async (req, res) => {
  const a = await knex("encomendas");
  res.status(200).json(a);
});

module.exports = routes;
