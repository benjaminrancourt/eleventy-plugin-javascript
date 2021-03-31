module.exports = {
  printJavaScriptArray: (array) => {
    if (!array || !array.length) return '';

    return `printJavaScriptArray
      ${array.join('\\n')}
    `;
  },
};
