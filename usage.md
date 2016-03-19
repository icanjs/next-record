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
