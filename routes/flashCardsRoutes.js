import express from "express";
const router = express.Router();

import {
  createCard,
  deleteCard,
  getAllCards,
  updateCard,
  showStats,
} from "../controllers/flashCardController.js";

import testUser from "../middleware/testUser.js";

router.route("/").post(testUser, createCard).get(getAllCards);

router.route("/stats").get(showStats);

router.route("/:id").delete(testUser, deleteCard).patch(testUser, updateCard);

export default router;
