function execute(expr, lib, ctx) {
  if (expr.type == "number") {
    return Number(expr.val);
  } else if (expr.type == "ident") {
    return ctx[expr.val] || 0;
  } else if (expr.type == "grouped") {
    return execute(expr.val, lib, ctx);
  } else if (expr.type == "infix") {
    let f = lib[expr.symbol];
    if (!f) throw "Unknown operator: " + expr.symbol;
    return f(execute(expr.left, lib, ctx), execute(expr.right, lib, ctx));
  }
}

function executeAll(ast, lib) {
  let result = [],
    ctx = {};

  for (let expr of ast) result.push(execute(expr, lib, ctx));

  return result;
}

module.exports = executeAll;
