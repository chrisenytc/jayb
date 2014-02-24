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

require('colors');


module.exports = function (msg, type) {
    var env = process.env.NODE_ENV || 'development';
    if ('test' !== env) {
        switch (type) {
        case 'error':
            console.log('Error '.red + msg);
            break;
        case 'warning':
            console.log('Warning '.yellow + msg);
            break;
        case 'info':
            console.log('Info '.cyan + msg);
            break;
        case 'success':
            console.log('Create '.green + msg);
            break;
        }
    }
};
