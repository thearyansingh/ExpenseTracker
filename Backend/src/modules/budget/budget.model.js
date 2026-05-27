import mongoose from "mongoose";

const budgetSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
      index: true,
    },

    name: {
      type: String,
      required: true,
      trim: true,
    },

    limitAmount: {
      type: Number,
      required: true,
      min: 0,
    },

    icon: {
      type: String,
      default: "💰",
    },

    color: {
      type: String,
      default: "#3B82F6",
    },
  },
  {
    timestamps: true,
  }
);

export default mongoose.model("Budget", budgetSchema);