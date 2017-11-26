import {Component, ViewEncapsulation} from '@angular/core';
import {Store} from './store/store';
import {Observable} from 'rxjs/Observable';
import 'rxjs/add/operator/delay';

@Component({
  selector: 'dk-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  encapsulation: ViewEncapsulation.Emulated
})
export class AppComponent {

  constructor(protected store: Store) {



//dankfix: remove
/*
    const arr = [
      {name: 'one1'},
      {name: 'two'},
      {name: 'three'},
      {name: 'four'},
      {name: 'five'},
    ];

    const obj = {stuff: 'lala', users: arr};
    obj.users = [7, ...arr];
    const a = {age: 50, ...obj};
    console.log(a);
*/

/*
    const arr = [
      {name: 'one1'},
      {name: 'two'},
      {name: 'three'},
      {name: 'four'},
      {name: 'five'},
    ];
    const len = arr.length;
    Observable.of(...arr)
      .delay(1000)
      .subscribe(x => console.log(x.name));
    arr.pop();
    console.log(arr);

*/




  }

}
