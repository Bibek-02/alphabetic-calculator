// server/src/models/Calculation.js
import mongoose from "mongoose";

const calculationSchema = new mongoose.Schema(
  {
    originalExpression: {
      type: String,
      required: true,
    },
    numericExpression: {
      type: String,
      required: true,
    },
    resultNumeric: {
      type: Number,
      required: true,
    },
    resultAlphabetic: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: { createdAt: true, updatedAt: false },
  }
);

export default mongoose.models.Calculation ||
  mongoose.model("Calculation", calculationSchema);
