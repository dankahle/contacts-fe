import {Label} from './label';

export interface Contact {
  id: number;
  name: string;
  labels: Label[];
  firstName: string;
  lastName: string;
  fileAs: string;
  company: string;
  jobTitle: string;
  emails: {email: string, label: string}[];
  phones: {country: string, phone: string, label: string}[];
  addresses: {address: string, label: string}[];
  birthday: string;
  dates: {date: string, label: string}[];
  websites: {website: string, label: string}[];
  relationships: {relationship: string, label: string}[];
  IMs: {IM: string, label: string}[];
  internetCalls: {internetCall: string, label: string}[];
  customs: {custom: string, label: string}[];
  notes: string;
}
