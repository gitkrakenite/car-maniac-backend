const Car = require("../models/carModel");

// DESC   create car
// METHOD   POST /api/v1/car/create
// ACCESS   public
const createCar = async (req, res) => {
  const { name, price, category, description, image, quantity } = req.body;

  // check if I have the necessary data
  if (!name || !price || !category || !description || !image || !quantity) {
    res.send("Details missing");
    return;
  }

  try {
    const car = await Car.create({
      name,
      price,
      category,
      description,
      image,
      quantity,
    });
    res.status(201).send(car);
  } catch (error) {
    res.status(201).send(error);
  }
};

// DESC   fetch cars
// METHOD   GET /api/v1/car/fetch
// ACCESS   public
const fetchCar = async (req, res) => {
  try {
    const car = await Car.find();
    res.status(201).send(car);
  } catch (error) {
    res.status(201).send(error);
  }
};

// DESC     delete a car
// METHOD   DELETE /api/v1/car/delete/:id
// ACCESS   public
const deleteCar = async (req, res) => {
  // check if car exists
  const carExists = await Car.findById(req.params.id);

  if (!carExists) {
    res.status(404).send("Car does not exist");
    return;
  }

  try {
    await Car.findByIdAndDelete(req.params.id);
    res.status(200).json({ id: req.params.id });
  } catch (error) {
    res.status(201).send(error);
  }
};

module.exports = { createCar, fetchCar, deleteCar };
