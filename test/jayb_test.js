/*
 * jayb
 * https://github.com/chrisenytc/jayb
 *
 * Copyright (c) 2013 Christopher EnyTC
 * Licensed under the MIT license.
 */

'use strict';

var chai = require('chai');
chai.use(require('chai-fs'));
var expect = chai.expect;
chai.should();

var jayb = require('../lib/jayb.js');
var h = require('../lib/helpers.js');

describe('jayb module', function () {
    //Test generate
    describe('#generate()', function () {
        it('should generate files with templates', function (done) {
            jayb.generate(function () {
                this.mkdir(__dirname + '/expected/temp');
                expect(__dirname + '/expected/temp').to.be.a.directory();
                this.compile(__dirname + '/fixtures/_test.html', __dirname + '/expected/temp/compiled.html', {
                    value: 'Compiled'
                });
                expect(__dirname + '/expected/temp/compiled.html').to.have.content('<p>\n    Compiled\n</p>\n');
                this.template('<p>\n    <%=value%>\n</p>\n', __dirname + '/expected/temp/template.html', {
                    value: 'Template'
                });
                expect(__dirname + '/expected/temp/template.html').to.have.content('<p>\n    Template\n</p>\n');
                this.copy(__dirname + '/fixtures/_test.html', __dirname + '/expected/temp/copied.html');
                expect(__dirname + '/expected/temp/copied.html').to.have.content('<p>\n    <%=value%>\n</p>\n');
                done();
            });
        });
    });
    //Test compile
    describe('#compile()', function () {
        it('should return a compiled string', function () {
            jayb.compile(__dirname + '/fixtures/_test.html', {
                value: 'Compiled'
            }).should.equal(h.read(__dirname + '/expected/temp/compiled.html'));
        });
    });
    //Test template
    describe('#template()', function () {
        it('should return a compiled string', function () {
            jayb.template('<p>\n    <%=value%>\n</p>\n', {
                value: 'Template'
            }).should.equal(h.read(__dirname + '/expected/temp/template.html'));
        });
    });
});
