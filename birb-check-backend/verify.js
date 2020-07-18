module.exports.isEmptyOrSpaces = function (str) {
  return str === null || str.match(/^ *$/) !== null;
};
