const milkMan = require("../model/milkManModel");
const asyncHandler = require("express-async-handler");

const getAllMilkManReport = asyncHandler(async (req, res) => {
  const allData = await milkMan.find({});
  res.json(allData);
});

const getSingleMilkManReport = asyncHandler(async (req, res) => {
  const milkman = await milkMan.findById(req.params.id);

  if (!milkman) {
    res.status(404);
    throw new Error("Milkman not found");
  }

  res.status(200).json(milkman);
});
const updateSingleMilkManReport = asyncHandler(async (req, res) => {
  const { name, quantity, date } = req.body;
  const milkman = await milkMan.findById(req.params.id);
  if (!milkman) {
    res.status(404);
    throw new Error("Milkman not found");
  }
  milkman.name = name || milkman.name;
  milkman.quantity = quantity || milkman.quantity;
  milkman.date = date || milkman.date;

  const updatedMilkman = await milkman.save();

  res.status(200).json(updatedMilkman);
});
const createMilkManReport = asyncHandler(async (req, res) => {
  const { start_time, end_time, duration, milk_quantity } = req.body;
  if (!start_time || !end_time || !duration || !milk_quantity) {
    res.status(400).json({
      success: false,
      message:
        "Please fill all fields: start_time, end_time, duration, milk_quantity",
    });
    return;
  }

  try {
    const newMilkManReport = await milkMan.create({
      start_time,
      end_time,
      duration,
      milk_quantity,
    });
    res.status(201).json({
      success: true,
      message: "Milkman report created successfully",
      data: newMilkManReport,
    });
  } catch (error) {
    console.error("Error creating milkman report:", error);
    res.status(500).json({
      success: false,
      message: "Internal server error",
      error: error.message,
    });
  }
});
module.exports = { getAllMilkManReport, createMilkManReport };
