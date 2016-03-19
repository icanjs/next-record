import connect from 'can-connect';
import 'can-connect/constructor/';
import 'can-connect/constructor/store/';
import 'can-connect/data/url/';
import 'can-connect/can/map/';
import fixture from 'can-fixture';

const Transaction = can.Map.extend({});

Transaction.List = can.List.extend({
  Map: Transaction
}, {});

export const connection = connect(['constructor', 'constructor-store', 'data-url', 'can-map'], {
  idProp: '_id',
  Map: Transaction,
  List: Transaction.List,
  name: 'Transaction',
  url: '/transactions'
});

fixture('GET /transactions', function(request){
  let res = [];
  if (request.data.hasOwnProperty('date')) {
    res = [{_id: 1, contact: 'Bitovi'}];
  }
  else if (request.data.hasOwnProperty('hotDate')) {
    res = [{_id: 1458348225555, contact: 'Aubree'}];
  }
  else if (request.data.hasOwnProperty('targetDate')) {
    res = [];
  }
  else {
    res = [{_id: 1, contact: 'Bitovi'}];
  }
  return res;
});
fixture.delay = 50;

export default Transaction;
