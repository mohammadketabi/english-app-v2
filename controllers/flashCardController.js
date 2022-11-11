import Card from "../models/Card.js";
import { StatusCodes } from "http-status-codes";
import { BadRequestError, NotFoundError } from "../errors/index.js";
import checkPermissions from "../utils/checkPermissions.js";
import mongoose from "mongoose";
import moment from "moment";

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
  console.log(req.user);
  const { search, status, type, sort } = req.query;

  const queryObject = {
    createdBy: req.user.userId,
  };

  if (status !== "all") {
    queryObject.status = status;
  }

  if (type !== "all") {
    queryObject.type = type;
  }

  if (search) {
    queryObject.word = { $regex: search, $options: "i" };
  }

  // NO AWAIT
  let result = Card.find(queryObject);

  // chain sort conditions
  if (sort === "latest") {
    result = result.sort("-createdAt");
  }
  if (sort === "oldest") {
    result = result.sort("createdAt");
  }
  if (sort === "a-z") {
    result = result.sort("word");
  }
  if (sort === "z-a") {
    result = result.sort("-word");
  }

  const page = Number(req.query.page) || 1;
  const limit = Number(req.query.limit) || 9;
  const skip = (page - 1) * limit;

  result = result.skip(skip).limit(limit);

  const cards = await result;

  const totalCards = await Card.countDocuments(queryObject);
  const numOfPages = Math.ceil(totalCards / limit);

  res.status(StatusCodes.OK).json({ cards, totalCards, numOfPages });
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
  let stats = await Card.aggregate([
    { $match: { createdBy: mongoose.Types.ObjectId(req.user.userId) } },
    { $group: { _id: "$status", count: { $sum: 1 } } },
  ]);

  stats = stats.reduce((acc, curr) => {
    const { _id: title, count } = curr;
    acc[title] = count;
    return acc;
  }, {});

  const defaultStats = {
    learned: stats.learned || 0,
    review: stats.review || 0,
    favorite: stats.favorite || 0,
  };

  let monthlyWords = await Card.aggregate([
    { $match: { createdBy: mongoose.Types.ObjectId(req.user.userId) } },
    {
      $group: {
        _id: {
          year: {
            $year: "$createdAt",
          },
          month: {
            $month: "$createdAt",
          },
        },
        count: { $sum: 1 },
      },
    },
    { $sort: { "_id.year": -1, "_id.month": -1 } },
    { $limit: 12 },
  ]);

  monthlyWords = monthlyWords
    .map((item) => {
      const {
        _id: { year, month },
        count,
      } = item;
      // accepts 0-11
      const date = moment()
        .month(month - 1)
        .year(year)
        .format("MMM Y");
      return { date, count };
    })
    .reverse();

  res.status(StatusCodes.OK).json({ defaultStats, monthlyWords });
};

export { createCard, deleteCard, getAllCards, updateCard, showStats };
