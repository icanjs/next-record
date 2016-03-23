import QUnit from 'steal-qunit';
import { ViewModel } from './next';
import Transaction from '../test/test-model';
import can from 'can';

// ViewModel unit tests
QUnit.module('next-record/next');

QUnit.test('Getting Data', function(assert){
  var done = assert.async();
  var vm = new ViewModel({
    model: Transaction,
    value: 501311,
  }, true);
  let test = new can.Map({});
  test.attr('value', 112);
  vm.bind('record', function(){
    QUnit.equal(vm.attr('record._id'), 1, 'Record was set correctly');
    done();
  });
});

QUnit.test('Can change the recordVarName', function(assert){
  var done = assert.async();
  var vm = new ViewModel({
    model: Transaction,
    value: 1458348224015,
    recordVarName: 'transaction'
  });
  vm.bind('transaction', function(){
    let record = vm.attr('transaction').attr();
    QUnit.equal(record._id, 1, 'Record was set correctly');
    done();
  });
});


QUnit.test('No result sets record to null', function(assert){
  var done = assert.async();
  var vm = new ViewModel({
    model: Transaction,
    value: 1458348225555,
    attr: 'targetDate',
    recordVarName: 'transaction'
  });
  vm.bind('transaction', function(){
    let record = vm.attr('transaction');
    QUnit.equal(record, null, 'Record was removed / set to null');
    done();
  });
});

QUnit.test('The server receives the value in the request.', function(assert){
  var done = assert.async();
  var vm = new ViewModel({
    model: Transaction,
    value: 1458348225555,
    attr: 'hotDate',
    recordVarName: 'transaction'
  });
  vm.bind('transaction', function(){
    QUnit.equal(
      vm.attr('transaction._id'),
      1458348225555,
      'The server was able to receive and process the value.'
    );
    done();
  });
});


QUnit.test('Defaults', function(){
  var vm = new ViewModel({});
  QUnit.equal(vm.attr('model'), undefined, 'There is no default model.');

  QUnit.equal(vm.attr('recordVarName'), 'record', 'The default record variable name is "record".');
  QUnit.equal(vm.attr('record'), undefined, 'There is no record by default.');
  QUnit.deepEqual(vm.attr('params'), {'date':{$gt: undefined}, $limit: 1, $sort: { date: 1 }}, 'Default params are in place.');

  // Set up a working model
  vm.attr('model', Transaction);

  // Change the value for $gt
  vm.attr('value', 'test the delay');
  QUnit.deepEqual(vm.attr('params'), {'date':{$gt: 'test the delay'}, $limit: 1, $sort: { date: 1 }}, 'Changing the value updates the params.');
  QUnit.deepEqual(vm.attr('request') instanceof Promise, true, 'Setting a value triggered a request.');

  // Change the gtKey
  vm.attr('gtKey', '>');
  QUnit.deepEqual(vm.attr('params'), {'date':{'>': 'test the delay'}, $limit: 1, $sort: { date: 1 }}, 'Changing the gtKey updates the params.');
  vm.attr('gtKey', '$gt');

  // Change the limitKey
  vm.attr('limitKey', 'limit');
  QUnit.deepEqual(vm.attr('params'), {'date':{'$gt': 'test the delay'}, limit: 1, $sort: { date: 1 }}, 'Changing the limitKey updates the params.');
  vm.attr('limitKey', '$limit');

  // Additional params get mixed in.
  vm.attr('paramTest', 123);
  QUnit.deepEqual(vm.attr('params'), {'date':{'$gt': 'test the delay'}, $limit: 1, $sort: { date: 1 }, test: 123}, 'Can add in custom params.');
  vm.removeAttr('paramTest');

  // Change the attr in the query.
  vm.attr('attr', 'createdAt');
  QUnit.deepEqual(vm.attr('params'), {'createdAt':{$gt: 'test the delay'}, $limit: 1, $sort: { createdAt: 1 }}, 'Changing the attr updates the params.');
  vm.attr({}, true);
});

QUnit.test('No Model results in Error', function(){
  var vm = new ViewModel({});
  // Set a value without a model.
  vm.attr('value', 'test');
  QUnit.equal(
    vm.attr('error') instanceof Error,
    true,
    'Setting a value w/o a model throws an error.'
  );
});

QUnit.test('Model without findOne results in Error', function(){
  var vm = new ViewModel({});
  // Test using a bad model.
  vm.attr('model', {});
  vm.attr('value', 'test');
  QUnit.equal(
    vm.attr('error') instanceof Error,
    true,
    'Setting a value with a bad model in place throws an error.'
  );
});
