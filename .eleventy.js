const javascriptCommentsShortcodes = require("./src/javascript-comments");
const toJavascriptShortcodes = require("./src/to-javascript");
const printJavascriptShortcodes = require("./src/print-javascript");

module.exports = (eleventyConfig) => {
  const shortcodes = {
    ...javascriptCommentsShortcodes,
    ...printJavascriptShortcodes,
    ...toJavascriptShortcodes,
  };
  const addShortcode = (key) => eleventyConfig.addShortcode(key, shortcodes[key]);
  const keys = Object.keys(shortcodes);
  keys.forEach(addShortcode);
};
