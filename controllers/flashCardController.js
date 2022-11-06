import Card from "../models/Card.js";
import { StatusCodes } from "http-status-codes";
import { BadRequestError, NotFoundError } from "../errors/index.js";
import checkPermissions from "../utils/checkPermissions.js";

const createCard = async (req, res) => {
  const { word, definition } = req.body;

  if (!word || !definition) {
    throw new BadRequestError("Please provide all values");
  }

  req.body.createdBy = req.user.userId;

  const card = await Card.create(req.body);
  res.status(StatusCodes.CREATED).json({ card });
};

const getAllCards = async (req, res) => {
  const cards = await Card.find({ createdBy: req.user.userId });
  res
    .status(StatusCodes.OK)
    .json({ cards, totalCards: cards.length, numOfPages: 1 });
};

const deleteCard = async (req, res) => {
  const { id: cardId } = req.params;

  const card = await Card.findOne({ _id: cardId });

  if (!card) {
    throw new NotFoundError(`No card with id : ${cardId}`);
  }

  checkPermissions(req.user, card.createdBy);

  await card.remove();
  res.status(StatusCodes.OK).json({ msg: "Success! Card removed" });
};

const updateCard = async (req, res) => {
  const { id: cardId } = req.params;

  const { word, definition } = req.body;

  if (!word || !definition) {
    throw new BadRequestError("Please Provide All Values");
  }

  const card = await Card.findOne({ _id: cardId });

  if (!card) {
    throw new NotFoundError(`No card with id ${cardId}`);
  }

  // check permissions
  checkPermissions(req.user, card.createdBy);

  const updatedCard = await Card.findOneAndUpdate({ _id: cardId }, req.body, {
    new: true,
    runValidators: true,
  });

  res.status(StatusCodes.OK).json({ updatedCard });
};

const showStats = async (req, res) => {
  res.send("show stats");
};

export { createCard, deleteCard, getAllCards, updateCard, showStats };
