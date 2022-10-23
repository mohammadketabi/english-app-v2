const createCard = async (req, res) => {
  res.send("create card");
};

const deleteCard = async (req, res) => {
  res.send("delete card");
};

const getAllCards = async (req, res) => {
  res.send("get all card");
};

const updateCard = async (req, res) => {
  res.send("update card");
};

const showStats = async (req, res) => {
  res.send("show stats");
};

export { createCard, deleteCard, getAllCards, updateCard, showStats };
