var s = [5, 4, 3, 2, 9, 8, 7, 6, 5, 4, 3, 2];
var f = [6, 5, 4, 3, 2, 9, 8, 7, 6, 5, 4, 3, 2];
var p = "##.###.###/####-##";

function CNPJ() {}

CNPJ.generate = function (formatted = true) {
  var initialNumber = this.generateInitialNumber(8).concat("0001");
  var digitOne = this.calculateDigit(initialNumber, s);
  var digitTwo = this.calculateDigit(initialNumber.concat(digitOne), f);

  var cnpj = initialNumber.concat(digitOne, digitTwo);

 
  return formatted ? applyMask(cnpj, p) : cnpj;
};


function applyMask(value, mask) {
  var maskedValue = "";
  var valueIndex = 0;

  for (var i = 0; i < mask.length; i++) {
    if (mask[i] === "#") {
      maskedValue += value[valueIndex] || ""; 
      valueIndex++;
    } else {
      maskedValue += mask[i];
    }
  }

  return maskedValue;
}

CNPJ.generateInitialNumber = function (size) {
  var number = "";

  for (var i = 0; i < size; i++) {
    var randomInt = parseInt(10 * Math.random());
    number = number.concat(randomInt.toString());
  }

  return number;
};

CNPJ.calculateDigit = function (numbers, weight) {
  var sum = 0;

  for (var i = 0; i < numbers.length; i++) {
    sum += numbers[i] * weight[i];
  }

  var mod = sum % 11;
  return mod < 2 ? 0 : 11 - mod;
};

module.exports = {
  CNPJ: CNPJ,
};