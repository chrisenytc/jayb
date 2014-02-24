# JayB [![Build Status](https://secure.travis-ci.org/chrisenytc/jayb.png?branch=master)](http://travis-ci.org/chrisenytc/jayb) [![NPM version](https://badge-me.herokuapp.com/api/npm/jayb.png)](http://badges.enytc.com/for/npm/jayb) [![Bitdeli Badge](https://d2weczhvl823v0.cloudfront.net/chrisenytc/jayb/trend.png)](https://bitdeli.com/free "Bitdeli Badge")

> A scaffold generator for create files with templates

## Getting Started
Install the module with: `npm install jayb`

```javascript
var jayb = require('jayb');

jayb.generate(function() {
  //methods here
});
```

## Documentation

#### .generate(fn)

**Parameter**: `fn`
**Type**: `Function`

**Options**

###### this.mkdir(path)
###### this.copy(path, newPath)
###### this.compile(templatePath, filePath, options)
###### this.template(templateString, filePath, options)

The 'generate' method is responsible for create directories, copy files and make files with templates

How to use this method

```javascript

jayb.generate(function() {
  this.mkdir('tmp'); // Create Dir
  this.compile('templates/example.js', 'tmp/myFile.js', {name: 'index'}); //Compile template and Create File
  this.template('console.log("<%name%>");', 'tmp/myFile.js', {name: 'index'}); //Create File based on template
  this.copy('tmp/myFile.js', 'tmp/myNewFile.js'); //Copy File
});
```

#### .compile(templatePath, options)

**Parameter**: `templatePath`
**Type**: `String`

**Example**

Path Example: `templates/controller.js`

```
 /**
 * <%=propertyName%>Controller
 *    `/<%=propertyName%>`
 */

exports.<%=propertyName%> = function(req, res) {
    //
    res.view();
};

```

**Parameter**: `options`
**Type**: `JSON Object`
**Example**: `{propertyName: 'index'}`

The 'compile' method is responsible for making dynamic files based on templates.

How to use this method

```javascript
jayb.compile('templates/controller.js', {propertyName: 'index'});
```

This method return a compiled string

```javascript
 /**
 * indexController
 *    `/index`
 */

exports.index = function(req, res) {
    //
    res.view();
};

```

#### .template(templateString, options)

**Parameter**: `templateString`
**Type**: `String`

**Example**

```javascript
console.log('<%=propertyName%>');
```

**Parameter**: `options`
**Type**: `JSON Object`
**Example**: `{propertyName: 'index'}`

The 'template' method is responsible for making dynamic files based on template string.

How to use this method

```javascript
jayb.template('console.log("<%=propertyName%>");', {propertyName: 'Hello World'});
```

This method return a compiled string

```javascript
console.log('Hello World');
```

#### .version()

Return current version

### Template String

For more information about template string usage, see [How to use template string](http://lodash.com/docs#template)

## Contributing

Please submit all issues and pull requests to the [chrisenytc/jayb](http://github.com/chrisenytc/jayb) repository!

## Support
If you have any problem or suggestion please open an issue [here](https://github.com/chrisenytc/jayb/issues).

## License
Copyright (c) 2014 Christopher EnyTC

Permission is hereby granted, free of charge, to any person
obtaining a copy of this software and associated documentation
files (the "Software"), to deal in the Software without
restriction, including without limitation the rights to use,
copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the
Software is furnished to do so, subject to the following
conditions:

The above copyright notice and this permission notice shall be
included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND,
EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES
OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND
NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT
HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY,
WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING
FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR
OTHER DEALINGS IN THE SOFTWARE.
