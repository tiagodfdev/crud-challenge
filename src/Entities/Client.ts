import { Contacts } from './Contacts';
export class Client {
    name:string;
    cpf:string;
    contact!:Contacts;
    constructor(name:string,cpf:string,email:string, phone:string){
        this.name = name;
        this.cpf = cpf;
        this.contact = new Contacts(email,phone)
    }
}