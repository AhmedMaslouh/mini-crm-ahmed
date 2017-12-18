
export class Contact {

  id: number;
  name: string = '';
  phone: string = '';
  email: string = '';
  mobile: string = '';
  website: string = '';
  address: string = '';
  company: string = '';
  social: string = '';
  favContact: boolean = false;
  createdDate: Date;

  constructor(values: Object = {}) {
    Object.assign(this, values);
  }
}
