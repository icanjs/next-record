import Component from 'can/component/';
import Map from 'can/map/';
import 'can/map/define/';
import './previous.less!';

export const ViewModel = Map.extend({
  define: {
    /**
     * A model must be provided. It's recommended that you import your model in
     * the template like in this example:
     *
     *   <can-import from="app-name/models/transaction" {^@value}="*TxnModel"/>
     *   <previous-record {model}="@*TxnModel"></previous-record>
     *
     * The `@` allows you to pass the TxnModel (which is a function) by reference
     * instead of calling it.
     * The `*` imports the `TxnModel` into the current template instead of into
     * a parent component's viewModel.
     */
    model: {},

    /**
     * Holds the xhr/promise made by the model.
     */
    request: {},

    /**
     * This is the name of the attribute that you're comparing, which corresponds
     * to the field in the database server's table/collection.
     */
    attr: {
      value: 'date'
    },

    /**
     * By default, request params will be in the format `{'date':{$lt: 'test'}, $limit: 1}`.
     * Use the ltKey attribute to change `$lt` to something else. Changing the
     * format of the request is not supported.
     */
    ltKey: {
      value: '$lt'
    },

    /**
     * By default, request params will be in the format `{'date':{$lt: 'test'}, $limit: 1}`.
     * Use the limitKey attribute to change `$limit` to something else. Changing
     * the format of the request is not supported.
     */
    limitKey: {
      value: '$limit'
    },

    /**
     * This is the value used in the query for the database to compare the `attr`
     * against.
     */
    value: {
      set(val){
        this.runQuery(val);
        return val;
      }
    },

    /**
     * By default, any found record will be available in the template as {{record}}.
     * You can customize the variable name by providing a different value here.
     */
    recordVarName: {
      value: 'record'
    },

    /**
     * These are the parameters that the model will use to query the db. It should
     * never be directly manipulated. `params` will be in the following format:
     * `{'date':{$lt: 'test'}, $limit: 1}`
     */
    params: {
      get(){
        return this.makeParams();
      }
    }
  },

  /**
   * Uses the model with the params to query the database.  Sets up the xhr object
   * for later reference.
   */
  runQuery(value){
    let params = this.makeParams(value);

    // Cancel any pending request.
    let currentRequest = this.attr('request');
    if (currentRequest && currentRequest.state && currentRequest.state() === 'pending') {
      currentRequest.abort();
    }

    if (!this.attr('model') || !this.attr('model').findAll) {
      this.attr('error', new Error('You must provide a model attribute on a <next-record> component.'));
      console.error(this.attr('error'));
      return;
    }

    // Create the new request.
    let request = this.attr('model').findAll(params);
    this.attr('request', request);

    // When the request comes back, set the record on the configured `recordVarName`.
    request.then(response => {
      let recordVarName = this.attr('recordVarName');
      this.attr(recordVarName, response && response.length ? response[0] : null);
    });
  },

  /**
   * Builds the query params based on the provided attributes.
   */
  makeParams(value){
    let params = {};
    params[this.attr('attr')] = {};
    params[this.attr('attr')][this.attr('ltKey')] = value || this.attr('value');
    params[this.attr('limitKey')] = 1;
    params.$sort = {};
    params.$sort[this.attr('attr')] = -1;
    // Merge in all attributes that start with 'param'
    Object.keys(this.attr()).forEach(key => {
      if (key.startsWith('param')) {
        let newKey = key.slice(5);
        newKey = newKey[0].toLowerCase() + newKey.slice(1);
        params[newKey] = this.attr(key);
      }
    });
    return params;
  }
});

export default Component.extend({
  tag: 'previous-record',
  viewModel: ViewModel
});
