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

var jayb = require('../lib/jayb');

jayb.generate(function () {
    this.mkdir('./expected/temp');
    this.compile('./fixtures/_test.html', './expected/temp/compiled.html', {
        value: 'HelloWorld'
    });
    this.template('<p>\n    <%=value%>\n</p>\n', './expected/temp/template.html', {
        value: 'HelloWorld'
    });
    this.copy('./fixtures/_test.html', './expected/temp/copied.html');
    this.copy('./fixtures/_test.html', './expected/temp/copied2.html');
});
