// utils
class Utils {
  convertToUnix(date) {
    return new Date(this.parserDate(date)).getTime() / 1000;
  }

  parserDate(date) {
    return date.split("-").reverse();
  }
}

module.exports = {
  utils: new Utils(),
};
