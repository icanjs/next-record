/*[global-shim-start]*/
(function (exports, global){
	var origDefine = global.define;

	var get = function(name){
		var parts = name.split("."),
			cur = global,
			i;
		for(i = 0 ; i < parts.length; i++){
			if(!cur) {
				break;
			}
			cur = cur[parts[i]];
		}
		return cur;
	};
	var modules = (global.define && global.define.modules) ||
		(global._define && global._define.modules) || {};
	var ourDefine = global.define = function(moduleName, deps, callback){
		var module;
		if(typeof deps === "function") {
			callback = deps;
			deps = [];
		}
		var args = [],
			i;
		for(i =0; i < deps.length; i++) {
			args.push( exports[deps[i]] ? get(exports[deps[i]]) : ( modules[deps[i]] || get(deps[i]) )  );
		}
		// CJS has no dependencies but 3 callback arguments
		if(!deps.length && callback.length) {
			module = { exports: {} };
			var require = function(name) {
				return exports[name] ? get(exports[name]) : modules[name];
			};
			args.push(require, module.exports, module);
		}
		// Babel uses the exports and module object.
		else if(!args[0] && deps[0] === "exports") {
			module = { exports: {} };
			args[0] = module.exports;
			if(deps[1] === "module") {
				args[1] = module;
			}
		} else if(!args[0] && deps[0] === "module") {
			args[0] = { id: moduleName };
		}

		global.define = origDefine;
		var result = callback ? callback.apply(null, args) : undefined;
		global.define = ourDefine;

		// Favor CJS module.exports over the return value
		modules[moduleName] = module && module.exports ? module.exports : result;
	};
	global.define.orig = origDefine;
	global.define.modules = modules;
	global.define.amd = true;
	ourDefine("@loader", [], function(){
		// shim for @@global-helpers
		var noop = function(){};
		return {
			get: function(){
				return { prepareGlobal: noop, retrieveGlobal: noop };
			},
			global: global,
			__exec: function(__load){
				eval("(function() { " + __load.source + " \n }).call(global);");
			}
		};
	});
})({},window)
/*next-record@0.0.0#next/next*/
define('next-record/next/next', [
    'exports',
    'can/component/component',
    'can/map/map',
    'can/map/define/define',
    'next-record/next/next.less'
], function (exports, _canComponent, _canMap, _canMapDefine, _nextLess) {
    'use strict';
    Object.defineProperty(exports, '__esModule', { value: true });
    function _interopRequireDefault(obj) {
        return obj && obj.__esModule ? obj : { 'default': obj };
    }
    var _Component = _interopRequireDefault(_canComponent);
    var _Map = _interopRequireDefault(_canMap);
    var ViewModel = _Map['default'].extend({
        define: {
            model: {},
            request: {},
            attr: { value: 'date' },
            gtKey: { value: '$gt' },
            limitKey: { value: '$limit' },
            value: {
                set: function set(val) {
                    this.runQuery(val);
                    return val;
                }
            },
            recordVarName: { value: 'record' },
            params: {
                get: function get() {
                    return this.makeParams();
                }
            }
        },
        runQuery: function runQuery(value) {
            var _this = this;
            var params = this.makeParams(value);
            var currentRequest = this.attr('request');
            if (currentRequest && currentRequest.state && currentRequest.state() === 'pending') {
                currentRequest.abort();
            }
            if (!this.attr('model') || !this.attr('model').findAll) {
                this.attr('error', new Error('You must provide a model attribute on a <next-record> component.'));
                console.error(this.attr('error'));
                return;
            }
            var request = this.attr('model').findAll(params);
            this.attr('request', request);
            request.then(function (response) {
                var recordVarName = _this.attr('recordVarName');
                _this.attr(recordVarName, response && response.length ? response[0] : null);
            });
        },
        makeParams: function makeParams(value) {
            var params = {};
            params[this.attr('attr')] = {};
            params[this.attr('attr')][this.attr('gtKey')] = value || this.attr('value');
            params[this.attr('limitKey')] = 1;
            return params;
        }
    });
    exports.ViewModel = ViewModel;
    exports['default'] = _Component['default'].extend({
        tag: 'next-record',
        viewModel: ViewModel
    });
});
/*next-record@0.0.0#previous/previous*/
define('next-record/previous/previous', [
    'exports',
    'can/component/component',
    'can/map/map',
    'can/map/define/define',
    'next-record/previous/previous.less'
], function (exports, _canComponent, _canMap, _canMapDefine, _previousLess) {
    'use strict';
    Object.defineProperty(exports, '__esModule', { value: true });
    function _interopRequireDefault(obj) {
        return obj && obj.__esModule ? obj : { 'default': obj };
    }
    var _Component = _interopRequireDefault(_canComponent);
    var _Map = _interopRequireDefault(_canMap);
    var ViewModel = _Map['default'].extend({
        define: {
            model: {},
            request: {},
            attr: { value: 'date' },
            ltKey: { value: '$lt' },
            limitKey: { value: '$limit' },
            value: {
                set: function set(val) {
                    this.runQuery(val);
                    return val;
                }
            },
            recordVarName: { value: 'record' },
            params: {
                get: function get() {
                    return this.makeParams();
                }
            }
        },
        runQuery: function runQuery(value) {
            var _this = this;
            var params = this.makeParams(value);
            var currentRequest = this.attr('request');
            if (currentRequest && currentRequest.state && currentRequest.state() === 'pending') {
                currentRequest.abort();
            }
            if (!this.attr('model') || !this.attr('model').findAll) {
                this.attr('error', new Error('You must provide a model attribute on a <next-record> component.'));
                console.error(this.attr('error'));
                return;
            }
            var request = this.attr('model').findAll(params);
            this.attr('request', request);
            request.then(function (response) {
                var recordVarName = _this.attr('recordVarName');
                _this.attr(recordVarName, response && response.length ? response[0] : null);
            });
        },
        makeParams: function makeParams(value) {
            var params = {};
            params[this.attr('attr')] = {};
            params[this.attr('attr')][this.attr('ltKey')] = value || this.attr('value');
            params[this.attr('limitKey')] = 1;
            return params;
        }
    });
    exports.ViewModel = ViewModel;
    exports['default'] = _Component['default'].extend({
        tag: 'previous-record',
        viewModel: ViewModel
    });
});
/*next-record@0.0.0#next-record*/
define('next-record', [
    'exports',
    'next-record/next/next',
    'next-record/previous/previous'
], function (exports, _next, _previous) {
    'use strict';
});
/*[global-shim-end]*/
(function (){
	window._define = window.define;
	window.define = window.define.orig;
})();