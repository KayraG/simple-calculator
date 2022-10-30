const parser = require("../parser"),
  tokenizer = require("../tokenizer");

console.log(parser(tokenizer("x > y > z")));
