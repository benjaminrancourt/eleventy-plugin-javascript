# @sherby/eleventy-plugin-javascript

This **[Eleventy](https://www.11ty.dev/)** plugin add useful shortcodes to JavaScript template files.

Here a brief introduction to these shortcodes:

- **To JavaScript**:
  - `toJavaScript`: general shortcode that will either call `toJavaScriptArray` or `toJavaScriptObject` shortcodes
  - `toJavaScriptArray`: return the content of a JavaScript array
  - `toJavaScriptObject`: return the content of a JavaScript object

- **Print JavaScript**:
  - `printJavaScriptArray`: print an array of JavaScript instructions

- **JavaScript comments**:
  - `closeJavaScriptComment`: add `*/` if the parameter is true, to close a JavaScript comment
  - `startJavaScriptComment`: add `/*` if the parameter is true, to start a JavaScript comment

You will find in the **Usage** section examples of these in action.

## Installation

Install the dependency with NPM:

```shell script
npm install @sherby/eleventy-plugin-javascript --save-dev
```

Open up your Eleventy config file (probably `.eleventy.js`) and use `addPlugin`:

```javascript
const eleventyPluginJavaScript = require("@sherby/eleventy-plugin-javascript");
module.exports = (eleventyConfig) => {
  eleventyConfig.addPlugin(eleventyPluginJavaScript);
};
```

## Usage
### `toJavaScript`, `toJavaScriptArray` and `toJavaScriptObject`
Do you have some data that you want to access as JavaScript variables?
The three following shortcodes will help you to do that, by removing
  the `[` and `]` of an JSON.stringify array (**toJavaScriptArray**) or
  the `{`, and `}` of an JSON.stringify object (**toJavaScriptObject**).

If you do not want to embarrass yourself with two shortcodes,
you can only use the **toJavaScript** shortcode that will handle the two cases.

Each of these shortcodes takes the following parameters:
  1. The object or the array to print as JavaScript
  2. (optional) Properties of the object(s) to keep,
     useful to keep only some properties instead of the whole object(s)

It will also output the function name on the commented line, to help you to debug.

#### `toJavaScriptObject` example
```javascript
this.author = {
  // {% toJavaScriptObject author %}
};

// will output
this.author = {
  // toJavaScriptObject
  lastname: 'Bloe',
  name: 'Joe',
  url: /'joe-bloe',
};
```

```javascript
this.author = {
  // {% toJavaScriptObject author, 'lastname,name' %}
};

// will output
this.author = {
  // toJavaScriptObject
  lastname: 'Bloe',
  name: 'Joe',
};
```

#### `toJavaScriptArray` examples
```javascript
this.navigation = [
  // {% toJavaScriptArray site.navigation %}
];

// will output
this.navigation = [
  // toJavaScriptArray
  { label: 'Page 1', url: '/page-1' }, { label: 'Page 2', url: '/page-2' }
];
```

```javascript
this.navigation = [
  // {% toJavaScriptArray site.navigation, "url" %}
];

// will output
this.navigation = [
  // toJavaScriptArray
  { url: '/page-1' }, { url: '/page-2' }
];
```

### `printJavaScriptArray`
If you have valid JavaScript instructions that are stored in an array,
this shortcode will print it correctly.

Here an example where I want to add `imports` only on certain files:
```javascript
/*---
  imports:
    - 'import '@justinribeiro/code-block';'
---*/

// And in my JavaScript template file:
import { html, css, LitElement } from 'lit-element';
// {% printJavaScriptArray post.imports %}

// will output
import { html, css, LitElement } from 'lit-element';
import '@justinribeiro/code-block';
```

### `startJavaScriptComment` and `closeJavaScriptComment`
Do you have some code that should exist only in your development environment?
These shortcodes allow you to ship only the code intended to production environment!

Here below an example where a variable is defined on localhost
and where it is replaced by a build command on others environments:

```javascript
/*
  {% closeJavaScriptComment site.isNotProduction %}
    // Make sure these variables exist on localhost, as BUILD_TIMESTAMP will be replaced on our build
    window.BUILD_TIMESTAMP = new Date().toISOString().replace('T', ' ').substring(0, 19);
  {% startJavaScriptComment site.isNotProduction %}
*/
console.log(`Version (${BUILD_TIMESTAMP})`);
```

## Publish

Increment the `version` defined in the `package.json` file and run the command below to publish the module in the
registry:

```bash
# Dry run
npm publish --dry-run

# For real (are you really sure?)
npm publish --access public
```

## License

The [MIT License][1] (MIT)

[1]: https://opensource.org/licenses/MIT
