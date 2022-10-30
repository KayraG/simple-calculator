const parser = require("../parser"),
  tokenizer = require("../tokenizer");

console.log(parser(tokenizer("((1+2)*3)/0")));
