# api-gateway-payload-parse [![Build Status](https://travis-ci.org/yyolk/api-gateway-payload-parse.svg?branch=master)](https://travis-ci.org/yyolk/api-gateway-payload-parse)
Utility function for easier parsing of the AWS API-Gateway built-in mapping template functions, like `input.params()`.

## Overview

By default, a mapping template like:

```json
{
"all-params" : "$input.params()",
"path-params" : "$input.params().path",
"query-params" : "$input.params().querystring",
"header-params" : "$input.params().header",
"header-param-names" : "$input.params().header.keySet()",
"content-type-value" : "$input.params().header.get('Content-Type')"
}
```

Will actually send it wrapped from Velocity like:

```json
{
  "all-params": "{path={path=users}, querystring={fields=id, anotherKey=aParam%2CanotherParam}, header={}}",
  "path-params" : "{path=users}",
  "query-params" : "{fields=id, anotherKey=aParam%2CanotherParam}",
  "header-params" : "{}",
  "header-param-names" : "[]",
  "content-type-value" : ""
}
```

Instead of making complex mapping templates, this module remaps:

    "{fields=id, anotherKey=aParam%2CanotherParam}"

to a javascript object:

    {
      fields: "id"
      anotherKey: "aParam,anotherParam"
    }


## Install
```sh
$ npm install --save api-gateway-payload-parse
```

## Usage
Create an integration request mapping template utilizing mapping variables provided by API Gateway. Or use the example above in [overview](#overview)

A full list is available here: [http://docs.aws.amazon.com/apigateway/latest/developerguide/api-gateway-mapping-template-reference.html]()

```js
// assuming a mapping template of:
// { "query-params": "$input.params().querystring" }
// which would make a application/json payload of:
// {"query-params": "{fields=id, anotherKey=aParam%2CanotherParam}"}

var payloadParse = require('api-gateway-payload-parse');

exports.handler = function(event, context) {
  var query_string = payloadParse(event['query-params']);
  context.done(query_string);
};
```
