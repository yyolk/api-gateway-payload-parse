'use strict';

module.exports = function(s) {
  ret = {};
  s = s
    .replace(/^{/g, '')
    .replace(/\}$/g, '')
    .split(/, /);
  s.forEach(function(t) {
    var q = querystring.decode(t);
    for (k in q) {
      ret[k] = q[k];
    };
  });
  return ret;
};
