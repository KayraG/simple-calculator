function parser(tklist) {
  let result = [],
    len = tklist.length,
    pars = 0,
    infix = [];
  var i = 0;

  for (; i < len; i++) {
    let ctk = tklist[i];
    if (ctk.type == "rparen") {
      if (pars == 0) throw "Unexpected token: )";
      pars -= 1;
      result.push({
        type: "grouped",
        val: result.pop(),
      });
      infix.pop();
    } else if (ctk.type == "lparen") {
      pars += 1;
      infix.push(false);
    } else if (ctk.type == "symbol") {
      infix.push([result.pop(), ctk]);
      continue;
    } else if (ctk.type == "number") {
      result.push(ctk);
    } else {
      throw "Wait, what?";
    }
    while (!!infix[infix.length - 1]) {
      let [left, sym] = infix.pop();
      result.push({
        type: "infix",
        symbol: sym.val,
        left,
        right: result.pop(),
      });
    }
  }
  return result;
}

module.exports = parser;
