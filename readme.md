# next-record

[![Build Status](https://travis-ci.org/icanjs/next-record.png?branch=master)](https://travis-ci.org/icanjs/next-record)

A component that retrieves the next record from a supplied model.

## Usage

### ES6 use

With StealJS, you can import this module directly in a template that is autorendered:

```js
import plugin from 'next-record';
```

### CommonJS use

Use `require` to load `next-record` and everything else
needed to create a template that uses `next-record`:

```js
var plugin = require("next-record");
```

## AMD use

Configure the `can` and `jquery` paths and the `next-record` package:

```html
<script src="require.js"></script>
<script>
	require.config({
	    paths: {
	        "jquery": "node_modules/jquery/dist/jquery",
	        "can": "node_modules/canjs/dist/amd/can"
	    },
	    packages: [{
		    	name: 'next-record',
		    	location: 'node_modules/next-record/dist/amd',
		    	main: 'lib/next-record'
	    }]
	});
	require(["main-amd"], function(){});
</script>
```

### Standalone use

Load the `global` version of the plugin:

```html
<script src='./node_modules/next-record/dist/global/next-record.js'></script>
```

## Contributing

### Making a Build

To make a build of the distributables into `dist/` in the cloned repository run

```
npm install
node build
```

### Running the tests

Tests can run in the browser by opening a webserver and visiting the `test.html` page.
Automated tests that run the tests from the command line in Firefox can be run with

```
npm test
```
