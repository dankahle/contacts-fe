const _ = require('lodash');

var equal = require('deep-equal');

const contact = {"id":"cc9da4cc-e4b9-5d81-81c3-4000af2204ae","labels":[{"id":"c62dac5b-97d8-53a5-9989-cb2f779bc5e3","name":"label3","icon":"label"}],"emails":[{"email":"","label":""}],"phones":[{"prefix":"","phone":"","label":""}],"addresses":[{"address":"","label":""}],"websites":[{"website":"","label":""}],"name":"","company":"","jobTitle":""};

const original = {"id":"cc9da4cc-e4b9-5d81-81c3-4000af2204ae","labels":[{"id":"c62dac5b-97d8-53a5-9989-cb2f779bc5e3","name":"label3","icon":"label"}],"emails":[{"email":"","label":""}],"phones":[{"prefix":"","phone":"","label":""}],"addresses":[{"address":"","label":""}],"websites":[{"website":"","label":""}],"name":"","company":"","jobTitle":""};

const eq = equal(contact, original);
console.log(eq);







/*
var equal = require('deep-equal');
console.dir([
  equal(
    { a : [ 2, null ], b : [ 4 ] },
    { a : [ 2, null ], b : [ 4 ] }
  ),
  equal(
    { x : 5, y : [6] },
    { x : 5, y : 6 }
  )
]);
*/





/*
let arr = [4,5,6];
for (let i = 0; i < arr.length; i++) {
  console.log(i, arr[i], arr.length);
  if (arr[i] === 4) {
    arr.splice(i, 1);
  }
}
console.log(arr)
*/

//console.log('////////////')

/*
let arr = [4,5,6];
for (let i = arr.length - 1; i > -1; i--) {
  console.log(i, arr[i], arr.length);
  if (arr[i] === 6) {
    arr.splice(i, 1);
  }
}
console.log(arr)
*/

/*
let arr = [4,5,6];
_.forEachRight(arr, (v,i) => {
  console.log(i, arr[i], arr.length);
  if (v === 4) {
    arr.splice(i, 1);
  }

})
console.log(arr)
*/





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
