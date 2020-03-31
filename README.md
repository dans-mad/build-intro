# build-intro
Introduction to build pipelines in JavaScript, using Webpack and Babel

Transpiling code with Babel
Alternative languages - TypeScript, Elm, PureScript, ClojureScript…
Utility functions with Lodash
Creating a build pipeline with Webpack

## Prerequisites
 * VSCode, node and npm installed
 
## Build pipelines
Up until now, we have been working on single html, css and JavaScript files. On larger projects it is necessary to split code into many smaller files when writing it, but then you need to package it back together before you use it in a web page. A _build pipeline_ lets you do this. It also lets you do other things - linting and formatting, inserting environment variables into code templates, generating separate development and production versions of an app, and much more.

We will be using _Webpack_ to create a build pipeline. This is the most popular and flexible build pipeline, but others are available and in use (e.g. Gulp, Parcel, Yeoman).

## Transpiling
[Transpiling](https://scotch.io/tutorials/javascript-transpilers-what-they-are-why-we-need-them) - often referred to (slightly inaccurately) as compiling - means turning your source code into different source code which does exactly the same thing. The main reason you will want to do this is so that you can write code using modern JavaScript, but still have it run on older browsers. You can also transpile from other languages such as TypeScript, CoffeeScript, Elm and PureScript.

We will be using _Babel_, which is the most widely used transpiling tool and can also be used easily from _Webpack_.

### Setting up the Babel npm project
 1. Fork and checkout this repo https://github.com/dans-mad/build-intro/
 1. In the `build-intro` directory that you just checked out, run `npm install` to download the project's dependencies to `node_modules` 
 
### Transpiling using Babel
 1. Install the Babel tools: `npm install --save-dev @babel/core @babel/cli @babel/preset-env`
 1. Install the Babel runtime polyfills: `npm install --save @babel/polyfill`
    * Note that this time we used `--save` instead of `--save-dev`: packages installed using `save-dev` are developer tools used while writing/formatting/testing etc, whereas packages installed using `save` are available at runtime, i.e. inside the web page you're building.
 1. Creating a config file named `babel.config.json` and add the following code:
    ```
    {
      "presets": [
        [
          "@babel/env",
          {
            "targets": {
              "edge": "10",
              "firefox": "60",
              "chrome": "67",
              "safari": "11.1"
            },
            "useBuiltIns": "usage"
          }
        ]
      ]
    }
    ```
1. Run the following command: `./node_modules/.bin/babel index.js --out-dir dist`
1. Open `index.js` in your project's root directory, and also `dist/index.js`
    * Compare the two. The two quite different blocks of code do exactly the same thing, but the one in dist is written in a way that older browsers can understand.
1. Change the first browser preset in `babel.config.json` from `"edge": "10"` to `"edge": "17"`
1. Run `./node_modules/.bin/babel index.js --out-dir dist` and then look at `dist/index.js` again.
    * The code in there has changed: still not the same as your code, but it now uses an arrow function (`=>`) and object destructuring (`let { destructuredParameter } = _ref;`) because the newer version of the Edge browser supports both of these features.

## Webpack
Webpack is a very powerful, but initially failry simple, tool for creating build pipelines for (mainly) JavaScript projects.

### Setting up the Webpack npm project
 1. Check out the `webpack` branch: `git checkout webpack`
 1. Install all package dependencies: `npm install` 
 1. Install webpack and its dependencies: 

### Creating a build pipeline using Webpack
 1. Install Lodash `npm install --save lodash` - Lodash is a package with loads of utility functions in it. We'll learn about them later...
 1. We've moved `index.js` to the `src` directory. So open `src/index.js`
 1. Read the source code of `index.js`. Work out what it does
    * Note that `lodash` is imported as a constant with the weird name of _`_`_ This is... just one of those things. You can name it something else if you want, but you might as well use the same name as everyone else. Lodash is built & championed by Functional Programmers, and they just _love_ short pithy names.
    * The function from Lodash we've used is `_.join` - it will hopefully be obvious what this does, but if not then the documentation is here: https://lodash.com/docs/#join
    * But this code is no good yet because... if the script is run in a browser, where does it get `lodash` from? We had to run `npm install lodash` to get it, but we need to include the `lodash` code with the code in `index.js`.
 1. Install Webpack and all of its dependencies: `npm i -D babel-loader @babel/core @babel/preset-env webpack webpack-cli`
 1. Run Webpack: `npx webpack`
 1. Webpack will generate a file containing your code bundled with Lodash in the `dist` directory. Open up `dist/index.js` and have a quick look at it.
    * I KNOW RIGHT!
    * There's no point in trying to make sense of the generated code. Ever. And just look how long the file is - thousands of lines of gibberish. When you're testing generated code like this, Webpack will generate a _source map_ which means you never need to look at generated code again.


### Configuring Webpack
 1. Delete the file generated by Webpack, `dist\index.js` 
 1. Now let's alter the config of Webpack. Create a file in the root of your project called `webpack.config.js` and paste in the following:
    ```
    const path = require('path')

    module.exports = {
      entry: './src/index.js',
      output: {
        filename: 'index.js',
        path: path.resolve(__dirname, 'dist'),
      },
    }
    ```
1. To make use of this new config, instead of running `npx webpack` we're going to set up an npm script to run Webpack with the config in `webpack.config.js`. Open up `package.json`
1. Find the `scripts` section. It will probably have one child, `"test": "echo \"Error: no test specified\" && exit 1"` - you can delete that for now, although there's no harm in leaving it there.
1. We'll call our npm script `build`, because it will become our build pipeline. This means it can be run using `npm run build`. So add the key `build` to the list of `scripts` with the value `webpack --config webpack.config.js`
    * It should look like this:
    ```
    "scripts": {
      "build": "webpack --config webpack.config.js"
    }
    ```
    * `webpack --config webpack.config.js` is the command that will be run now every time we use `npm run build`.
    * In later lessons we'll be adding more scripts to this section, to let us do different types of build, and to lint and test our code.
 1. Save `package.json` and then run webpack by typing `npm run build` - this should have exactly the same result as when you ran `ngx webpack` earlier.
 1. Run Webpack again - `npm run build`
    * This time instead of `dist/index.js` Webpack generates `dist/index.js`, because of the `filename` parameter in your Webpack config.
 1. Change the next line in the config to `path: path.resolve(__dirname, 'dist'),`
 1. Run `npx webpack` again and this time you'll see that the file created is `dist\index.js`
    * You may have noticed a yellow warning, _The 'mode' option has not been set, webpack will fallback to 'production' for this value..._. Let's fix that!
 1. Add a key value pair `mode: 'development'` to `webpack.config.js` so that the object assigned to `module.exports` looks like this:
    ```
    {
      mode: 'development',
      entry: './src/index.js',
      output: {
        filename: 'index.js',
        path: path.resolve(__dirname, 'dist')
      }
      ```
 1. Run `npm run build` again. No yellow warning! Brilliant.
    * Read https://webpack.js.org/configuration/mode/ to understand the differences between `development` and `production` mode.
 1. Let's add Babel to our Webpack pipeline. Webpack uses a package called `babel-loader` to run Babel. So install it: `npm i -D babel-loader`
 1. Add a `module` section to your `webpack.config.js` that looks like this:
    ```
      module: {
        rules: [
          {
            test: /\.(js)$/,
            use: 'babel-loader',
            exclude: /node_modules/
          }
        ]
      },
      ```
    * This tells Webpack to check for files whose names end in `js` and to transpile them through Babel Loader. It also tells webpack to ignore any `.js` files inside `/node_modules/` as those will (almost always) have been transpiled already.  

### Running a development server in Webpack
Until now, we have run a website locally by running `http-server`. Webpack has its own local webserver, which lets you see the changes in your page every time you edit the code. Let's set it up...
1. Add a new key to `webpack.config.js` named `devServer`:
```
  devServer: {
    contentBase: path.join(__dirname, 'dist'),
    compress: true,
    port: 9000
  }
```

### Webpack plugins
A lot of Webpack's power comes from the many plugins you can use to extend it. 

### Additional Exercise
 * Creating and maintaining build pipelines is an extremely useful skill to have, and one that even experienced developers often lack. In some teams, there is just one person who knows how to change the build pipeline. Being that person (or someone who can share the load with that person) is often very appreciated. With that in mind, it's worth browsing through the [Webpack documentation](https://webpack.js.org/guides/) and [list of plugins](https://webpack.js.org/plugins/), to get some idea of the vast range of things possible. Experiment with what you learn there by making pipelines of your own.

## Revision & Reference
