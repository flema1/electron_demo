# electron_demo

[![Electron Logo](https://electron.atom.io/images/electron-logo.svg)](https://electron.atom.io/)

## A simple step-by-step guide to developing applications with [Electron](http://electron.atom.io/).

The Electron framework lets you write cross-platform desktop applications
using JavaScript, HTML and CSS. It is based on [Node.js](https://nodejs.org/) and
[Chromium](http://www.chromium.org) and is used by the [Atom
editor](https://github.com/atom/atom) and many other [apps](https://electron.atom.io/apps).


# The bare bones approach. ☠️

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



# Install with generator-electron [![Build Status](https://travis-ci.org/sindresorhus/generator-electron.svg?branch=master)](https://travis-ci.org/sindresorhus/generator-electron)

## Install

```
$ npm install --global yo generator-electron
```
## Usage

With [yo](https://github.com/yeoman/yo):

```
$ yo electron
```


# Live reloading your Electron app with Gulp
There are a few options but here's one way to use auto reload with [Gulp](https://github.com/gulpjs/gulp) instead of manual reloading.

<p align="center">
  <a href="http://gulpjs.com">
    <img height="157" width="64" src="https://raw.githubusercontent.com/gulpjs/artwork/master/gulp-2x.png">
  </a>
  <p align="center">The streaming build system</p>
</p>

```
$ npm install electron-connect
```
## First, install gulp (globally):
```
$ npm install --global gulp-cli
```
## and for local gulp dep in your project
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
### Start gulp task by running “gulp”;

## License

MIT © [Franklin Lema]
MIT © [Karen Baque]
