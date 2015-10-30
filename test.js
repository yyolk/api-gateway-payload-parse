import test from 'ava';
import fn from './';

test(t => {
  t.same(fn("{fields=id, anotherKey=aParam%2CanotherParam}"), {fields: 'id', anotherKey: 'aParam,anotherParam'});
  t.end();
});
