


const _ = require('lodash');



var a = {};
a['one.two.three'] = 'crap';

console.log(a);


/*
function getPhoneNo(value) {
  return value.prefix + value.phone.replace(/[^0-9]+/g, '');
}


console.log(getPhoneNo({prefix: '55', phone: '(319) 1-555.1212'}));
*/



/*
getUrl(website) {
  if (/^(http:\/\/|https:\/\/)/.test(website)) {
    return website;
  } else {
    return 'http://' + website;
  }
}


console.log(getUrl('http://lala'));
console.log(getUrl('https://lala'));
console.log(getUrl('noprefix'));

*/

/*
console.log(new Date().getFullYear());
const dt = new Date();
dt.setFullYear(dt.getFullYear() + 1);
console.log(dt);
const i = 5;
*/

/*
const arr = [
  {id: 1, name: 'dank'},
  {id: 2, name: 'alice'}
];

console.log(_.sortBy(arr, 'name'));
console.log(arr);
*/


/*
let obj = {};
_.set(obj, 'addr.street', 'lovell')
console.log(obj)
*/



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
