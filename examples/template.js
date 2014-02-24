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

var result = jayb.template('<p>\n    <%=value%>\n</p>\n', {
    value: 'Template'
});

console.log(result);
