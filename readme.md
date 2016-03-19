# <next-record> & <previous-record>
CanJS Components to retrieve the next or previous record from a supplied model.

[![Build Status](https://travis-ci.org/icanjs/next-record.png?branch=master)](https://travis-ci.org/icanjs/next-record)

Includes the `<next-record>` and `<previous-record>` components.

## Installation

```
npm install next-record --save
```

This component requires either a can-connect model or a can.Model.  Using CanJS's built-in support for StealJS, you can now import the model and components directly inside your template:

```html
<!-- This can-import includes both components. -->
<can-import from="next-record"/>
<!-- You'll need to supply a model and import it to the template scope. -->
<can-import from="models/my-model" {^@value}="*MyModel"/>

<!-- This example assumes that a parent component has a timestamp attribute. -->
<next-record {model}="@*TxnModel" {value}="timestamp">
  {{record}}
</next-record>

<previous-record {model}="@*TxnModel" {value}="timestamp">
  {{record}}
</previous-record>
```

For installing in a CommonJS, AMD, or Standalone environment, please see the [usage page](./usage.md).

## Usage

The first step is to provide a model that implements a `findAll` function.  You can import a model directly in the template using the following syntax:

```html
<can-import from="models/my-model" {^@value}="*MyModel"/>
```

The `*` before `MyModel` creates a template variable named `*MyModel` that can be used anywhere in the current template.  Because this variable represents a function, in order to pass it to a component, we have to use the `@` operator to pass the function by reference (like a normal variable) instead of calling it. So, passing it into a component looks like this:

```html
<next-record {model}="@*TxnModel" {value}="timestamp">
  {{record}}
</next-record>
```

The `next-record` and `previous-record` components work by creating query params in this format:

```js
{'date':{$gt: value}, $limit: 1} // next-record
{'date':{$lt: value}, $limit: 1} // previous-record
```

and passing them to the model that you provide.  Notice in above examples that the default attribute for comparison is `date`.  So by default, `next-record` will query for the date following the `value` (which would probably be a timestamp).  The basic structure above is not something that can be modified, but each of the attributes can be modified using the following attributes.

 * `attr` - This is the name of the attribute that you're comparing, which corresponds to the field in the database server's table/collection.
 * `value` - This is the value used in the query against which the database will compare the `attr`.
 * `ltKey` - For the `previous-record` component. Replaces the `$lt` in the query params.  `$lt` stands for 'less than'.
 * `gtKey` - For the `next-record` component. Replaces the `$gt` in the query params. `$gt` stands for 'greater than'.
 * `limitKey` - Replaces the `$limit` in the query params.
 * `recordVarName` - This determines the variable name where the found record will be available within the component's scope.  By default it is on `record`, but you can change it to better describe the data it represents. For example:

 ```html
<previous-record {model}="@*AppointmentModel" {value}="timestamp" record-var-name="appointment">
 {{appointment}}
</previous-record>

<previous-record {model}="@*TransactionModel" {value}="timestamp" record-var-name="transaction">
 {{transaction}}
</previous-record>
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
