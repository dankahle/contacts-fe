


const _ = require('lodash');




let arr = [4,5,6];
  arr.forEach((v, i) => {
    console.log(v, i, arr.length);
    if (v === 5) {
      arr.splice(i, 1);
    }
  })
console.log(arr)

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
