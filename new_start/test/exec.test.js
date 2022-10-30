const exec = require("../exec"),
  parser = require("../parser"),
  tokenizer = require("../tokenizer");

console.log(
  exec(parser(tokenizer("1+2")), {
    ["+"]: (x, y) => x + y,
  })
);
