const supabase = require("../supa");

const getOrders = async (req, res) => {
  try {
    const orders = (
      await supabase
        .from("encomendas")
        .select("*")
        .order("date", { ascending: true })
    ).data;
    res.status(200).json(orders);
  } catch (error) {
    return res.status(500).json({ mensagem: error.message });
  }
};

const getDescriptions = async (req, res) => {
  const { id } = req.params;

  try {
    const descriptions = (
      await supabase
        .from("descricoes")
        .select("*")
        .eq("encomenda_id", Number(id))
    ).data;
    return res.status(200).json(descriptions);
  } catch (error) {
    return res.status(500).json({ mensagem: error.message });
  }
};

const getDescriptionsTitle = async (req, res) => {
  const { title } = req.params;

  try {
    const order = (
      await supabase.from("encomendas").select("*").eq("title", title).single()
    ).data;
    if (!order) {
      return res.status(404).json("Encomenda não encontrada");
    }
    const descriptions = (
      await supabase.from("descricoes").select("*").eq("encomenda_id", order.id)
    ).data;

    return res.status(200).json(descriptions);
  } catch (error) {
    return res.status(500).json({ mensagem: error.message });
  }
};

const deleteOrders = async (req, res) => {
  const { id } = req.params;
  try {
    const order = (
      await supabase.from("encomendas").select("*").eq("id", id).single()
    ).data;

    if (!order) {
      return res.status(404).json("Encomenda não encontrada");
    }

    await supabase.from("descricoes").delete().eq("encomenda_id", id);

    await supabase.from("encomendas").delete().eq("id", id);

    return res.status(200).json("Deletado com sucesso!");
  } catch (error) {
    return res.status(500).json({ mensagem: error.message });
  }
};
const deleteDescription = async (req, res) => {
  const { id } = req.params;
  try {
    const description = (
      await supabase.from("descricoes").select("*").eq("id", id).single()
    ).data;

    if (!description) {
      return res.status(404).json("Descrição não encontrada");
    }

    await supabase.from("descricoes").delete().eq("id", id);

    return res.status(200).json("Deletado com sucesso!");
  } catch (error) {
    return res.status(500).json({ mensagem: error.message });
  }
};

const postOrder = async (req, res) => {
  const { title, date, total, paid } = req.body;
  try {
    if (!title || !date || !total || !paid) {
      return res.status(400).json("Todos os campos sao obrigatórios");
    }
    const orders = (
      await supabase
        .from("encomendas")
        .select("*")
        .order("date", { ascending: true })
    ).data;

    const findTitle = orders.find((order) => {
      return order.title === title;
    });

    if (findTitle) {
      return res.status(400).json("Encomenda já cadastrada!");
    }

    const data = date.split("/");
    const year = new Date().getFullYear();
    const setDate = `${year}-${data[1]}-${data[0]}`;

    const supa = await supabase
      .from("encomendas")
      .insert({
        title,
        date: setDate,
        total: total * 100,
        paid: paid * 100,
      })
      .select();

    return res.status(201).json(supa.data);
  } catch (error) {
    return res.status(500).json({ mensagem: error.message });
  }
};

const postDescription = async (req, res) => {
  const { title, description } = req.body;

  if (!description || !title) {
    return res.status(500).json("Todos os campos são obrigatórios");
  }

  try {
    const order = (
      await supabase.from("encomendas").select("*").eq("title", title).single()
    ).data;

    if (!order) {
      return res.status(404).json("Encomenda não encontrada");
    }

    const descriptions = (
      await supabase.from("descricoes").select("*").eq("encomenda_id", order.id)
    ).data;

    const findDescription = descriptions.find((desc) => {
      return desc.description === description;
    });

    if (findDescription) {
      return res.status(400).json("Não pode adicionar duas descrições iguais");
    }

    await supabase.from("descricoes").insert([
      {
        encomenda_id: order.id,
        description,
      },
    ]);

    return res.status(201).json("Descrição criada com sucesso");
  } catch (error) {
    return res.status(500).json({ mensagem: error.message });
  }
};

module.exports = {
  getOrders,
  postOrder,
  postDescription,
  getDescriptions,
  getDescriptionsTitle,
  deleteOrders,
  deleteDescription,
};
