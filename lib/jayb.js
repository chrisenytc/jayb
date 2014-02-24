/*
 * jayb
 * https://github.com/chrisenytc/jayb
 *
 * Copyright (c) 2014 Christopher EnyTC
 * Licensed under the MIT license.
 */

'use strict';

/*
 * Module Dependencies
 */

var _ = require('lodash');
var fs = require('fs-extra');
var h = require('./helpers');
var path = require('path');
var debug = require('./debugger');
var argv = require('minimist')(process.argv.slice(2));
require('colors');

/**
@class JayB
 */

/*
 * Private Methods
 */

/*
 * Public Methods
 */

/**
 * Method responsible for generate files
 *
 * @example
 *
 *     jayb.generate(function() {
 *			this.mkdir('tmp'); // Create Dir
 *  		this.compile('templates/example.js', 'tmp/myFile.js', {name: 'index'}); //Compile template and Create File
 * 			this.template('console.log("<%name%>");', 'tmp/myFile.js', {name: 'index'}); //Compile template string and Create File
 * 			this.copy('tmp/myFile.js', 'tmp/myNewFile.js'); //Copy File
 * 	   });
 *
 * @method generate
 * @public
 * @param {Function} fn Function manager
 */

exports.generate = function generate(fn) {
    //Create Function
    fn = fn || function cb() {};

    /*
     * Prototypes
     */

    //Copy File
    fn.prototype.copy = function copy(path, newPath) {
        if (h.exists(path)) {
            fs.copySync(path, newPath);
            debug(newPath, 'success');
        } else {
            debug(path + ' does not exist.', 'error');
        }
    };
    //Create Dir
    fn.prototype.mkdir = function mkdir(path) {
        if (h.exists(path)) {
            if (argv.force) {
                h.rm(path);
                fs.mkdirSync(path);
                debug(path, 'success');
            } else {
                console.log('Conflit on '.red + path.bold.white + ' use ' + '--force'.red + ' to replace.');
            }
        } else {
            fs.mkdirSync(path);
            debug(path, 'success');
        }
    };
    //Compile template string
    fn.prototype.compile = function compile(templatePath, path, options) {
        //
        options = options || {};
        //
        if (h.exists(path)) {
            if (argv.force) {
                h.remove(path);
                h.write(path, exports.compile(templatePath, options));
                debug(path, 'success');
            } else {
                console.log('Conflit on '.red + path.bold.white + ' use ' + '--force'.red + ' to replace.');
            }
        } else {
            h.write(path, exports.compile(templatePath, options));
            debug(path, 'success');
        }
    };
    //Compile template string
    fn.prototype.template = function template(templateString, path, options) {
        //
        options = options || {};
        //
        if (h.exists(path)) {
            if (argv.force) {
                h.remove(path);
                h.write(path, exports.template(templateString, options));
                debug(path, 'success');
            } else {
                console.log('Conflit on '.red + path.bold.white + ' use ' + '--force'.red + ' to replace.');
            }
        } else {
            h.write(path, exports.template(templateString, options));
            debug(path, 'success');
        }
    };
    //Call to callback
    fn.call(fn.prototype);
};

/**
 * Method responsible for compile templates
 *
 * @example
 *
 *     jayb.compile('./path/to/template', {value: 'helloWorld'});
 *
 * @method compile
 * @public
 * @param {String} path Path of template
 * @param {Object} options Options to populate template
 * @return {String} Compiled template
 */

exports.compile = function compile(path, options) {

    return _.template(h.read(path), options);
};

/**
 * Method responsible for compile template string
 *
 * @example
 *
 *     jayb.template('<div><%= value %></div>', {value: 'helloWorld'});
 *
 * @method template
 * @public
 * @param {String} templateString Template string
 * @param {Object} options Options to populate template
 * @return {String} parsed template
 */

exports.template = function template(templateString, options) {

    return _.template(templateString, options);
};

/**
 * Method responsible for return a version of JayB
 *
 * @example
 *
 *     jayb.version();
 *
 * @method version
 * @public
 * @return {String} The current version
 */

exports.version = function () {
    var gPackage = require(path.join(__dirname, '..', 'package.json'));
    return gPackage.version;
};
