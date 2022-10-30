function isDigit(ch) {
  let cc = ch.charCodeAt(0);
  return cc > 47 && cc < 58;
}

function isWs(ch) {
  return ch == " " || ch == "\n" || ch == "\t";
}

let symbols = "+-*/".split("");
let table = {
  "(": "lparen",
  ")": "rparen",
};

function tokenizer(str) {
  let result = [],
    len = str.length;

  var i = 0;

  function getChar() {
    return str[i];
  }

  function addToken(type, val) {
    result.push({ type, val });
  }

  for (; i < len; ) {
    if (isWs(getChar())) {
      while (isWs(getChar())) i++;
    } else if (!!table[getChar()]) {
      addToken(table[getChar()], getChar());
      i++;
    } else if (symbols.includes(getChar())) {
      let s = "";
      while (i < len && symbols.includes(getChar())) {
        s += getChar();
        i++;
      }
      addToken("symbol", s);
    } else if (isDigit(getChar())) {
      let s = "";
      while (i < len && (isDigit(getChar()) || getChar() == ".")) {
        s += getChar();
        i++;
      }
      addToken("number", s);
    } else throw "Unknown character: " + getChar();
  }

  return result;
}

module.exports = tokenizer;
