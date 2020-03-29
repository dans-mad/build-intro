# build-intro
Introduction to build pipelines in JavaScript, using Webpack and Babel

## Transpiling
[Transpiling](https://en.wikipedia.org/wiki/Source-to-source_compiler) - often referred to (slightly inaccurately) as compiling - means turning your source code into different source code which does exactly the same thing. The main reason you will want to do this is so that you can write code using modern JavaScript, but still have it run on older browsers. You can also transpile from languages 

## Build pipelines

## Prerequisites
 * VSCode, node and npm installed

## Setup
 * Fork and checkout this repo https://github.com/dans-mad/build-intro/
 * In the `build-intro` directory that you just checked out, run `npm install` to download the project's dependencies to `node_modules` 
 
## Exercises
### Exercise 1 - transpiling using Babel
 * Install the Babel tools: `npm install --save-dev @babel/core @babel/cli @babel/preset-env`
 * Install the Babel runtime polyfills: `npm install --save @babel/polyfill` Note that this time we used `--save` instead of `--save-dev`: packages installed using `save-dev` are developer tools used while writing/formatting/testing etc, whereas packages installed using `save` are available at runtime, i.e. inside the web page you're building.
 * Creating a config file named `babel.config.json` and add the following code:
 ```
{
  "presets": [
    [
      "@babel/env",
      {
        "targets": {
          "edge": "10",
          "firefox": "50",
          "chrome": "50",
          "safari": "10"
        },
        "useBuiltIns": "usage"
      }
    ]
  ]
}
```
* Run the following command: `./node_modules/.bin/babel index.js --out-dir output`
* Open `index.js` in your project's root directory, and also `output/index.js`. Compare the two. The two quite different blocks of code do exactly the same thing, but the one in output is written in a way that older browsers can understand.
* Change the browser presets in `babel.config.json` to:
```
          "edge": "17",
          "firefox": "60",
          "chrome": "67",
          "safari": "11.1"
```
* Run `./node_modules/.bin/babel index.js --out-dir output` and then look at `output/index.js` again - it's changed, still not the same as your code, but it now uses an arrow function (`=>`) and object destructuring (`let { destructuredParameter } = _ref;`) because the newer browsers you have targetted supports both of these features.

### Exercise 2 - Build pipelines using Webpack
 * 

### Additional Exercise

## Revision
