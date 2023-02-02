const express = require("express");
const {
  createCar,
  fetchCar,
  deleteCar,
} = require("../controllers/carController");
const router = express.Router();

router.post("/create", createCar);
router.delete("/delete/:id", deleteCar);
router.put("/update/:id");
router.get("/fetch", fetchCar);

module.exports = router;
