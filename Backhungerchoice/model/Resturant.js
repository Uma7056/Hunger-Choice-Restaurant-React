

var mongoose=require('mongoose')

const menuSchema = new mongoose.Schema({
    name: { type: String, required: true }, // Name of the menu item
    price: { type: Number, required: true }, // Price of the item
    description: { type: String }, // Optional description for the item
    viewed: { type: Boolean, default: false }, // To track if the item has been viewed
  });

  const restaurantSchema = new mongoose.Schema({
    id: { type: Number, required: true, unique: true }, // Unique ID for each restaurant
    name: { type: String, required: true }, // Restaurant name
    image: { type: String }, // URL or path to the restaurant's image
    menu: [menuSchema], // Menu is an array of menu items
  });

  module.exports= mongoose.model("Restaurant", restaurantSchema);
