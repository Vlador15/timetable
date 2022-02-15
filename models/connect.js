const mongoose = require("mongoose");
const config = require("config");

const url = config.get("database");

mongoose
  .connect(url, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
  })
  .then(() => console.log("DB connected success"))
  .catch((e) => console.log("DB connect failed: " + e));

module.exports = mongoose;
