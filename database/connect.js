const mongoose = require("mongoose");

const connectToDatabase = () => {
  mongoose
    .connect(process.env.mongo_url)
    .then(() => console.log("Mongo Has Been Connected"))
    .catch((err) => console.log(err));
};

module.exports = connectToDatabase;
