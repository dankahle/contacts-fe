const _ = require('lodash');


let arr = [
  {name: 'dank'},
  {name: 'carl'},
]
const b = _.sortBy(arr, 'name');
console.log(arr);
console.log(b);


/*
myrequest(url, options) {
  return Promise((resolve, reject) => {
    request(url, options, (err, resp) => {
      if (err) {
        reject(err);
      } else {
        resolve(resp);
      }
    })
  })
}


const request = Q.denodeify(require('request'));

class myclass {

  doSomething() {
    request.bind(this)
    return request('someurl',options)
  }
}
*/

/*
const cp = require('child_process');
  const child = cp.exec('./initdbunit.sh', {cwd: '../contacts-be'}, (error, stdout, stderr) => {
  if (error) {
    throw error;
  }
  console.log(stdout);
});
*/


/*
const start = Date.now();

function fcn() {
  const diff = Date.now() - start;
  console.log('fcn run', diff);
  return 'fend' + diff;
}

tfcn = _.throttle(fcn, 200, {trailing:false});

const timer = setInterval(() => {
  console.log('run', tfcn());
}, 100)
*/


/*
const start = Date.now();
function fcn() {
  console.log(Date.now() - start);
}
const timer = setInterval(_.throttle(fcn, 200, {trailing:false}), 100)

setTimeout(() => {
  clearInterval(timer);
}, 300)
*/



/*
function resolveAfter2Seconds(x) {
  return new Promise(resolve => {
    setTimeout(() => {
      resolve(x);
    }, 1000);
  });
}


async function add1(x) {
  const a = await resolveAfter2Seconds(20);
  console.log(a);
  const b = await resolveAfter2Seconds(30);
  console.log(b);
  return x + a + b;
}

function add2(x) {
  let a;
  return resolveAfter2Seconds(20)
    .then(_a => {
      a = _a;
      return resolveAfter2Seconds(30);
    })
    .then(b => {
      return x + a + b;
    });
}

add2(5).then(v => {
  console.log(v);  // prints 60 after 4 seconds.
});
*/


/*
function resolveAfter2Seconds(val) {
  return new Promise(resolve => {
    setTimeout(() => {
      resolve('resolved' + val);
    }, 2000);
  });
}

(async function asyncCall() {
  console.log('calling');
  var result = await resolveAfter2Seconds(5);
  console.log(result);
  throw 'shit';
  return result;
  // expected output: "resolved"
})().then(val => console.log('done', val), err => console.error('myerr', err));

// asyncCall();
*/


/*
function* foo(index) {
  while (index <= 5) {
    yield index++;
  }
}

const iterator = foo(0);

for (let val of foo(1)) {
  console.log(val);
}

*/


/*
function fcn (...params) {
  params.forEach(parm => console.log(parm));
}

fcn(...[4,5,6]);
*/

/*

function inject(arr, fcn) {
  const servArr = [];
  arr.forEach(val => {
    // get val from injector creation and add to servArray
    servArr.push(val);
  });
  return fcn.bind({}, ...servArr);
}

function test(fcn) {
  fcn();
}

test(inject([4,5,6], (...parms) => {
  parms.forEach(parm => console.log(parm));
}));

it('lala', async(inject(arr, () => {


})));
*/


/*
const rx = require('rxjs');
const Subject = rx.Subject;

const sub = new Subject();

const subscription = sub.subscribe(x => console.log('next', x),
  err => console.error('error', err),
  () => console.log('complete'));

sub.next(4);
sub.next(5);
sub.next(6);
console.log('closed?', subscription.closed);
sub.complete();
console.log('closed?', subscription.closed);
sub.next(7);
*/


/*
const a = { type: 'number',
  maxLength: 9999,
  pattern: '.*',
  format: 'email',
  messages:
  { comments: '',
    type: 'Email must be a number',
    maxLength: 'Email is too long',
    pattern: 'Email must start with \'dank\'',
    format: 'Invalid email address' }
}

const val = ['type'];
console.log(a.messages && a.messages[val]);

*/


/*
var equal = require('deep-equal');

const contact = {"id":"cc9da4cc-e4b9-5d81-81c3-4000af2204ae","labels":[{"id":"c62dac5b-97d8-53a5-9989-cb2f779bc5e3","name":"label3","icon":"label"}],"emails":[{"email":"","label":""}],"phones":[{"prefix":"","phone":"","label":""}],"addresses":[{"address":"","label":""}],"websites":[{"website":"","label":""}],"name":"","company":"","jobTitle":""};

const original = {"id":"cc9da4cc-e4b9-5d81-81c3-4000af2204ae","labels":[{"id":"c62dac5b-97d8-53a5-9989-cb2f779bc5e3","name":"label3","icon":"label"}],"emails":[{"email":"","label":""}],"phones":[{"prefix":"","phone":"","label":""}],"addresses":[{"address":"","label":""}],"websites":[{"website":"","label":""}],"name":"","company":"","jobTitle":""};

const eq = equal(contact, original);
console.log(eq);
*/


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
