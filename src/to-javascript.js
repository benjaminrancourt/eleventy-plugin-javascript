const jsonStableStringify = require("json-stable-stringify");

const addPropertyToObject = (object, newObject) => (property) => (newObject[property] = object[property]);
const stringify = (object) => jsonStableStringify(object, { space: 2 });
const slice = (string) => string.slice(1, string.length - 1);

const toObject = (properties) => (object) => {
  const newObject = {};
  properties.forEach(addPropertyToObject(object, newObject));
  return newObject;
};

const toJavaScriptObject = (object, properties) => {
  let javaScriptObject = toObject(properties)(object);
  javaScriptObject = stringify(javaScriptObject);
  return slice(javaScriptObject);
};

const toJavaScriptArray = (objects, properties) => {
  let javaScriptArray = objects.map(toObject(properties));
  javaScriptArray = stringify(javaScriptArray);
  return slice(javaScriptArray);
};

const getProperties = (object, propertiesAsString) => {
  if (propertiesAsString) return propertiesAsString.split(",");
  return Object.keys(object);
};

module.exports = {
  toJavaScript: (object, propertiesAsString) => {
    if (!object) return "";

    const properties = getProperties(object, propertiesAsString);
    const toJavaScriptFunction = Array.isArray(object) ? toJavaScriptArray : toJavaScriptObject;
    return `toJavaScript
      ${toJavaScriptFunction(object, properties)}
    `;
  },

  toJavaScriptArray: (objects, propertiesAsString) => {
    if (!objects || !objects.length) return "";

    const properties = getProperties(objects[0], propertiesAsString);
    return `toJavaScriptArray
      ${toJavaScriptArray(objects, properties)}
    `;
  },

  toJavaScriptObject: (object, propertiesAsString) => {
    if (!object) return "";

    const properties = getProperties(object, propertiesAsString);
    return `toJavaScriptObject
      ${toJavaScriptObject(object, properties)}
    `;
  },
};
