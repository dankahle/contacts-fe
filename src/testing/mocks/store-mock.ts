import {Store} from '../../app/store/store';
import {User} from '../../app/store/models/user';
import {Contact} from '../../app/store/models/contact';
import {Label} from '../../app/store/models/label';
import {ObservableMediaMock} from './observable-media-mock';
import * as _ from 'lodash';

export const labelOne = <Label>{id: 'c62dac5b-97d8-53a5-9989-cb2f779bc5e1', name: 'label one', icon: 'label'};
export const labelTwo = <Label>{id: 'c62dac5b-97d8-53a5-9989-cb2f779bc5e2', name: 'label two', icon: 'label'};
export const labelThree = <Label>{id: 'c62dac5b-97d8-53a5-9989-cb2f779bc5e3', name: 'label zthree', icon: 'label'};
export const dankUserId = 'c62dac5b-97d8-53a5-9989-cb2f779bc7e1';
export const dankCompany = 'dank co';

export const contacts = <Contact[]>[
  {
    userId: dankUserId,
    id: 'c62dac5b-97d8-53a5-9989-cb2f779bc6e1',
    name: 'jane',
    company: 'jane co',
    jobTitle: 'Manager',
    labels: [labelOne, labelTwo],
    'emails': [
      {
        'email': 'jane1@gmail.com',
        'label': 'Work'
      },
      {
        'email': 'jane2@gmail.com',
        'label': 'Home'
      }
    ],
    'phones': [
      {
        'prefix': '1',
        'phone': '111-222-3333',
        'label': 'Work'
      },
      {
        'prefix': '55',
        'phone': '112-222-3333',
        'label': 'Mobile'
      }
    ],
    'addresses': [
      {
        'address': '952 NE Lovell St. Hillsboro, OR 97124',
        'label': 'Home'
      },
      {
        'address': '10260 SW Greenburg Rd #600, Tigard, OR 97223',
        'label': 'Work'
      }
    ],
    'websites': [
      {
        'website': 'https://www.google.com',
        'label': 'google'
      },
      {
        'website': 'www.weather.com',
        'label': 'weather'
      }
    ],
    'notes': 'notes first line\nnotes second line\nnotes third line'
  },
  {
    userId: dankUserId,
    id: 'c62dac5b-97d8-53a5-9989-cb2f779bc6e2',
    name: 'Brenda',
    jobTitle: 'QA',
    labels: [labelTwo],
    'emails': [
      {
        'email': 'brenda1@gmail.com',
        'label': 'Work'
      },
      {
        'email': 'brenda2@gmail.com',
        'label': 'Home'
      }
    ],
    'phones': [
      {
        'prefix': '1',
        'phone': '111-222-3333',
        'label': 'Work'
      },
      {
        'prefix': '55',
        'phone': '112-222-3333',
        'label': 'Mobile'
      }
    ],
    'addresses': [
      {
        'address': '952 NE Lovell St. Hillsboro, OR 97124',
        'label': 'Home'
      },
      {
        'address': '10260 SW Greenburg Rd #600, Tigard, OR 97223',
        'label': 'Work'
      }
    ],
    'websites': [
      {
        'website': 'https://www.google.com',
        'label': 'google'
      },
      {
        'website': 'www.weather.com',
        'label': 'weather'
      }
    ],
    'notes': 'notes first line\nnotes second line\nnotes third line'
  },
  {
    userId: dankUserId,
    id: 'c62dac5b-97d8-53a5-9989-cb2f779bc6e3',
    company: 'Martha Co',
    labels: [labelOne],
    'emails': [
      {
        'email': 'martha1@gmail.com'
      },
      {
        'email': 'martha2@gmail.com',
        'label': 'Home'
      }
    ],
    'phones': [
      {
        'prefix': '1',
        'phone': '111-222-3333'
      },
      {
        'prefix': '55',
        'phone': '112-222-3333',
        'label': 'Mobile'
      }
    ],
    'addresses': [
      {
        'address': '952 NE Lovell St. Hillsboro, OR 97124'
      },
      {
        'address': '10260 SW Greenburg Rd #600, Tigard, OR 97223',
        'label': 'Work'
      }
    ],
    'websites': [
      {
        'website': 'https://www.google.com'
      },
      {
        'website': 'www.weather.com',
        'label': 'weather'
      }
    ],
    'notes': 'notes first line\nnotes second line\nnotes third line'
  }
];

export const user = <User>{
  id: dankUserId,
  name: 'dank',
  company: dankCompany,
  labels: [labelOne, labelTwo, labelThree],
  created: '2017-12-07T00:00:00.000Z',
  modified: '2017-12-08T00:00:00.000Z'
};

export function getContacts() {
  return _.cloneDeep(contacts);
}

export function getUser() {
  return _.cloneDeep(user);
}

export function createStore() {
  const store = new Store(<any>new ObservableMediaMock());
  store.pubInitialized(true);
  store.usr.pubUser(getUser());
  store.con.pubContacts(getContacts());
  return store;
}
