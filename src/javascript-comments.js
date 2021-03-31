module.exports = {
  startJavaScriptComment: (start = true) => (start ? '/*' : ''),
  closeJavaScriptComment: (close = true) => (close ? '*/' : ''),
};
