

const _ = require('lodash');

let obj = {};
_.set(obj, 'addr.street', 'lovell')
console.log(obj)



/*
const Rx = require('rxjs');

var subject = new Rx.BehaviorSubject(0); // 0 is the initial value
var a = {};
a.subscribe = subject.subscribe.bind(subject);

a.subscribe(v => console.log('observerA: ' + v));

subject.next(1);
subject.next(2);

subject.subscribe({
  next: (v) => console.log('observerB: ' + v)
});

subject.next(3);
*/
