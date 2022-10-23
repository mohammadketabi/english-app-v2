import express from "express";
const router = express.Router();

import {
  createCard,
  deleteCard,
  getAllCards,
  updateCard,
  showStats,
} from "../controllers/flashCardController.js";

router.route("/").post(createCard).get(getAllCards);

router.route("/stats").get(showStats);

router.route("/:id").delete(deleteCard).patch(updateCard);

export default router;
