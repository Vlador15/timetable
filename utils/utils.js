const moment = require("moment");

exports.spaces = function (string) {
  if (!string) return false;
  if (typeof string !== "string") string = string.toString();
  return (
    string
      .split("")
      .reverse()
      .join("")
      .match(/[0-9]{1,3}/g)
      .join(" ")
      .split("")
      .reverse()
      .join("") + " руб."
  );
};

exports.date = function () {
  return `[${moment(Date.now()).format("DD.MM.YYYY | HH:mm:ss")}]`;
};
