const mongoose = require("mongoose");

module.exports = () => {
  return mongoose.connect("mongodb+srv://arun:arun_123@cluster0.tyjhr.mongodb.net/?retryWrites=true&w=majority");

};
