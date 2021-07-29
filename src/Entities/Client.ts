import Contacts from './Contacts';

export default class Client {
    name:string;

    cpf:string;

    contact!:Contacts;

    constructor(name:string, cpf:string, email:string, phone:string) {
      this.name = name;
      this.cpf = cpf;
      this.contact = new Contacts(email, phone);
    }
}
