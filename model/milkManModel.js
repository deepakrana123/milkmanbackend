const mongoose = require("mongoose");

const milkManSchema = mongoose.Schema(
  {
    start_time: {
      type: Date,
      required: true,
    },
    end_time: {
      type: Date,
      required: true,
    },
    duration: {
      type: Number,
      required: true,
    },
    milk_quantity: {
      type: Number,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

const milkMan = mongoose.model("MILKMAN", milkManSchema);

module.exports = milkMan;
