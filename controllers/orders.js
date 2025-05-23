const knex = require("../src/connect");

const getOrders = async (req, res) => {
  try {
    const orders = await knex("encomendas").orderBy("date");
    res.status(200).json(orders);
  } catch (error) {
    return res.status(500).json({ mensagem: error.message });
  }
};
const deleteOrders = async (req, res) => {
  const { id } = req.params;
  try {
    const order = await knex("encomendas").where({ id }).first();

    if (!order) {
      return res.status(404).json("Encomenda não encontrada");
    }

    await knex("descricoes").del().where({ encomenda_id: id });

    await knex("encomendas").del().where({ id });

    return res.status(200).json("Deletado com sucesso!");
  } catch (error) {
    return res.status(500).json({ mensagem: error.message });
  }
};
const deleteDescription = async (req, res) => {
  const { id } = req.params;
  try {
    const description = await knex("descricoes").where({ id }).first();

    if (!description) {
      return res.status(404).json("Descrição não encontrada");
    }

    await knex("descricoes").del().where({ id });

    return res.status(200).json("Deletado com sucesso!");
  } catch (error) {
    return res.status(500).json({ mensagem: error.message });
  }
};

module.exports = { getOrders, deleteOrders, deleteDescription };
