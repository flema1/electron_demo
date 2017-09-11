# electron_demo

[![Electron Logo](https://electron.atom.io/images/electron-logo.svg)](https://electron.atom.io/)

## A simple step-by-step guide to developing applications with [Electron](http://electron.atom.io/).

The Electron framework lets you write cross-platform desktop applications
using JavaScript, HTML and CSS. It is based on [Node.js](https://nodejs.org/) and
[Chromium](http://www.chromium.org) and is used by the [Atom
editor](https://github.com/atom/atom) and many other [apps](https://electron.atom.io/apps).


# The bare bones approach. ☠️

![root dir screenshot](https://github.com/flema1/electron_demo/blob/master/Screen%20Shot%202017-09-10%20at%208.04.26%20PM.png)

In the project root directory create a new package.json file in it with the following contents:

	```
	{
	    "name": "sound_machine",
	    "version": "0.1.0",
	    "main": "./main.js",
	    "scripts": {
		"start": "electron ."
	    }
	}
```
Also in the root directory create a main.js file include the following contents:
	```
	'use strict';
	const electron = require('electron');

	var BrowserWindow = electron.BrowserWindow;
	const app = electron.app;

	// adds debug features like hotkeys for triggering dev tools and reload
	require('electron-debug')();

	// prevent window being garbage collected
	let mainWindow;

	function onClosed() {
		// dereference the window
		// for multiple windows store them in an array
		mainWindow = null;
	}

	function createMainWindow() {
		const win = new electron.BrowserWindow({
			width: 600,
			height: 400
		});

		win.loadURL(`file://${__dirname}/app/index.html`);
		win.on('closed', onClosed);

		return win;
	}

	app.on('window-all-closed', () => {
		if (process.platform !== 'darwin') {
			app.quit();
		}
	});

	app.on('activate', () => {
		if (!mainWindow) {
			mainWindow = createMainWindow();
		}
	});

	app.on('ready', () => {
		mainWindow = createMainWindow();
	});
```
source: https://medium.com/@jimmco/electron-apps-and-live-reload-2a4d621a9fcd


## Installing the  [Electron](https://github.com/electron/electron) prebuilt binary for your operating system through npm. 
Run the following in your CLI (in the project folder):
```
	npm install electron --save-dev --save-exact
```

Create an app directory and an index.html file in that folder with an initial HTML boiler plate and a 'hello world':
```
	<!doctype html>
	<html>
		<head>
			<meta charset="utf-8">
			<title>Electron boilerplate</title>
			<link rel="stylesheet" href="index.css">

		</head>
		<body>
			<div class="container">
				<header>
					<h1>Hello World!</h1>
				</header>
				<section class="main"></section>
				<footer></footer>
			</div>
	</html>
```



# Installing Electron with [generator-electron](https://github.com/sindresorhus/generator-electron)

![sourced screenshot](https://github.com/sindresorhus/generator-electron/blob/master/screenshot.png)
source: https://github.com/sindresorhus/generator-electron


## Install

```
	$ npm install --global yo generator-electron
```
## Run using yo:

With [yo](https://github.com/yeoman/yo):

```
	$ yo electron
```


# Live reloading your Electron app with Gulp
## There are a few options but here's one way to use auto reload with [Gulp](https://github.com/gulpjs/gulp) instead of manual reloading.

source: https://medium.com/@jimmco/electron-apps-and-live-reload-2a4d621a9fcd


<p align="center">
  <a href="http://gulpjs.com">
    <img height="157" width="64" src="https://raw.githubusercontent.com/gulpjs/artwork/master/gulp-2x.png">
  </a>
  <p align="center">The streaming build system</p>
</p>


## Install [electron-connect](https://github.com/Quramy/electron-connect), a utility tool to develop applications with Electron.
```
$ npm install electron-connect
```
## Install gulp (globally):
```
	$ npm install --global gulp-cli
```
## ... and for local gulp dep in your project
```
	$ npm install --save-dev gulp
```
## Then create a gulpfile.js with task that provides reloading

```
	'use strict';
	var gulp = require('gulp');
	var electron = require('electron-connect').server.create();
	gulp.task('default', function () {
	// Start browser process
	 electron.start();
	// Restart browser process
	 gulp.watch('app.js', electron.restart);
	// Reload renderer process
	 gulp.watch(['index.html'], electron.reload);
	});
	https://medium.com/@jimmco/electron-apps-and-live-reload-2a4d621a9fcd
```

##  Attach a client script to the  Electron app index.html.
```
	<script>require(‘electron-connect’).client.create()</script>
```

## In app.js connect mainWindow to electron-connect
```
	var client = require('electron-connect').client;
	var BrowserWindow = electron.BrowserWindow;
```

## Start gulp task by running “gulp”;
![root dir screenshot](https://github.com/flema1/electron_demo/blob/master/Screen%20Shot%202017-09-10%20at%208.03.41%20PM.png)


# Using [jQuery](https://jquery.com/) with the Electron Framework
  <p align="center"> <a href="https://jquery.com/">
    <img height="50" width="100" src="https://upload.wikimedia.org/wikipedia/commons/thumb/d/d3/Logo_jQuery.svg/2000px-Logo_jQuery.svg.png">
  </a>

</p>

### JQuery cannot be used in Electron simply by including the jQuery script file into your document. An error message on the console will look as following :
```
	Uncaught ReferenceError : $ is not defined
	 or
	Uncaught ReferenceError : jQuery is not defined
```
source: https://ourcodeworld.com/articles/read/202/how-to-include-and-use-jquery-in-electron-framework


## Install 
```
	npm install jquery --save
```

## Add the following code inside a script tag in the main.js file to fix the loading issue:

```
	<script>window.$ = window.jQuery = require('jquery');</script>
```

### Jquery may also be loaded from a jquery file or a hosted [library](https://developers.google.com/speed/libraries/). On the main.js file, insert the normal script imports with an addition "onload" assignment to address the loading issue:
```
	<script src="scripts/jquery.min.js onload="window.$ = window.jQuery = module.exports;"></script>  

	or 

	<script src="https://ajax.googleapis.com/ajax/libs/jquery/3.2.1/jquery.min.js onload="window.$ = window.jQuery = 	module.exports;"></script>
```
source: https://stackoverflow.com/questions/37745273/integrate-jquery-into-a-electron-app


