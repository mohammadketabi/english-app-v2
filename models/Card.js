import mongoose from "mongoose";

const CardSchema = new mongoose.Schema(
  {
    word: {
      type: String,
      required: [true, "Please provide word"],
      maxlength: 20,
    },
    type: {
      type: String,
      enum: [
        "noun",
        "determiner",
        "pronoun",
        "verb",
        "adjective",
        "adverb",
        "preposition",
        "conjunction",
        "phrase",
        "idiom",
      ],
      default: "noun",
    },
    definition: {
      type: String,
      required: [true, "Please provide definition"],
    },
    exampleOne: {
      type: String,
      default: "Example one",
    },
    exampleTwo: {
      type: String,
      default: "Example two",
    },
    status: {
      type: String,
      enum: ["learned", "review", "favorite"],
      default: "review",
    },
    createdBy: {
      type: mongoose.Types.ObjectId,
      ref: "User",
      required: [true, "Please provide user"],
    },
  },
  { timestamps: true }
);

export default mongoose.model("Card", CardSchema);
