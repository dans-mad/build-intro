"use strict";

var someFunction = function someFunction(regularParameter, _ref) {
  var destructuredParameter = _ref.destructuredParameter;
  console.log(regularParameter, destructuredParameter);
};

module.exports = someFunction;