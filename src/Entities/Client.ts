/* eslint-disable no-new-object */
/* eslint-disable import/no-cycle */
import React from 'react';
import Api from './Api';
import Contacts from './Contacts';

export default class Client extends Api {
    name:string;

    cpf:string;

    contact!:Contacts;

    constructor(name:string, cpf:string, email:string, phone:string, endpoint:string, _id?:string) {
      super(endpoint, _id);
      this.name = name;
      this.cpf = cpf;
      this.contact = new Contacts(email, phone);
    }

    rmClient() {
      return this.deleteClient();
    }

    addClient(setSubmitState:React.Dispatch<React.SetStateAction<boolean>>) {
      return this.newClient(this, setSubmitState);
    }

    updClient(setSubmitState:React.Dispatch<React.SetStateAction<boolean>>) {
      const dataSender = {
        name: this.name,
        cpf: this.cpf,
        contact: { email: this.contact.email, phone: this.contact.phone },
      };
      return this.updateClient(dataSender, setSubmitState);
    }
}
