const xss = require("xss");

exports.filterOutHTMLTags = str => xss(str, { whiteList: [], stripIgnoreTag: true });