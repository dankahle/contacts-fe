import {Label} from './label';

export interface Contact {
  id: number;
  name: string;
  labels: Label[];
  company: string;
  jobTitle: string;
  emails: {email: string, label: string}[];
  phones: {prefix: string, phone: string, label: string}[];
  addresses: {address: string, label: string}[];
  websites: {website: string, label: string}[];
  notes: string;
}
