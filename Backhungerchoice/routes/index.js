var express = require('express');
var router = express.Router();
var Restaurant= require('../model/Resturant')


router.get("/getAllRestaurants", async (req, res) => {
  try {
    const restaurants = await Restaurant.find(); // Fetch all restaurants
    res.status(200).json(restaurants);
  } catch (error) {
    console.error("Error fetching restaurants:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});


// GET API to fetch the menu of a specific restaurant
router.get("/getMenu/:id", async (req, res) => {
  try {
    const { id } = req.params;

    // Find the restaurant by ID
    const restaurant = await Restaurant.findOne({ id });

    if (!restaurant) {
      return res.status(404).json({ error: "Restaurant not found" });
    }

    // Return the menu items
    res.status(200).json({
      message: `Menu for restaurant ${restaurant.name}`,
      menu: restaurant.menu,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal server error" });
  }
});

// POST API to add a new restaurant with menu items
router.post("/addRestaurant", async (req, res) => {
  try {
    const { id, name, image, menu } = req.body;

    // Validate request body
    if (!id || !name || !menu || !Array.isArray(menu)) {
      return res.status(400).json({ error: "Invalid input data" });
    }

    // Create a new restaurant document
    const newRestaurant = new Restaurant({
      id,
      name,
      image,
      menu,
    });

    // Save the restaurant to the database
    await newRestaurant.save();

    res.status(201).json({ message: "Restaurant added successfully!", data: newRestaurant });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal server error" });
  }
});

module.exports = router;
