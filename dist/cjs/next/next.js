/*next-record@0.1.4#next/next*/
'use strict';
Object.defineProperty(exports, '__esModule', { value: true });
function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : { 'default': obj };
}
var _canComponent = require('can/component/component');
var _canComponent2 = _interopRequireDefault(_canComponent);
var _can = require('can');
var _can2 = _interopRequireDefault(_can);
var _canMap = require('can/map/map');
var _canMap2 = _interopRequireDefault(_canMap);
require('can/map/define/define');
require('./next.less.css');
var ViewModel = _canMap2['default'].extend({
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
        var params = {}, additionalParams = this.attr('additionalParams');
        if (additionalParams && additionalParams.attr) {
            additionalParams = additionalParams.attr();
        }
        params[this.attr('attr')] = {};
        params[this.attr('attr')][this.attr('gtKey')] = value || this.attr('value');
        params[this.attr('limitKey')] = 1;
        params.$sort = {};
        params.$sort[this.attr('attr')] = 1;
        _can2['default'].extend(params, additionalParams);
        return params;
    }
});
exports.ViewModel = ViewModel;
exports['default'] = _canComponent2['default'].extend({
    tag: 'next-record',
    viewModel: ViewModel
});