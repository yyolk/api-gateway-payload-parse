'use strict';

var querystring = require('querystring');

module.exports = function(s) {
  var ret = {};
  s = s
    .replace(/^\{/g, '')
    .replace(/\}$/g, '')
    .split(/, /);
  s.forEach(function(t) {
    var q = querystring.decode(t);
    for (var k in q) {
      ret[k] = q[k];
    };
  });
  return ret;
};
