/* eslint-disable consistent-return */
/* eslint-disable no-alert */
/* eslint-disable no-underscore-dangle */
import React from 'react';
import { IClient } from '../types';

export default abstract class Api {
    _id:string|undefined;

    enpoint:string;

    constructor(enpoint:string, _id?:string) {
      this.enpoint = enpoint;
      this._id = _id;
    }

    protected deleteClient = async () => {
      const res = await fetch(`https://crudcrud.com/api/${this.enpoint}/clients/${this._id}`, {
        method: 'DELETE',
        headers: {
          Host: 'crudcrud.com',
          'Content-Type': 'application/json',
          Accept: '*/*',
        },
      });
      if (res.status >= 200 && res.status < 299) {
        alert('Deletado com sucesso');
        return true;
      }
      if (res.status >= 300 || false) {
        alert('Serviço temporariamente fora do ar');
        return false;
      }
    };

    protected newClient = async (body:IClient,
      setSubmitState:React.Dispatch<React.SetStateAction<boolean>>) => {
      const res = await fetch(`https://crudcrud.com/api/${this.enpoint}/clients`, {
        method: 'POST',
        headers: {
          Host: 'crudcrud.com',
          'Content-Type': 'application/json',
          Accept: '*/*',
        },
        body: JSON.stringify(body),
      });
      if (res.status >= 200 && res.status < 299) {
        setSubmitState(false);
        alert('Cliente criado com sucesso!');
        return true;
      }
      if (res.status >= 300 || false) {
        setSubmitState(false);
        alert('Serviço de e-mail temporariamente fora do ar');
        return false;
      }
    }

    protected updateClient = async (body:IClient,
      setSubmitState:React.Dispatch<React.SetStateAction<boolean>>) => {
      const res = await fetch(`https://crudcrud.com/api/${this.enpoint}/clients/${this._id}`, {
        method: 'PUT',
        headers: {
          Host: 'crudcrud.com',
          'Content-Type': 'application/json',
          Accept: '*/*',
        },
        body: JSON.stringify(body),
      });
      if (res.status >= 200 && res.status < 299) {
        setSubmitState(false);
        alert('Modificado com sucesso');
        return true;
      }
      if (res.status >= 300 || false) {
        setSubmitState(false);
        alert('Serviço temporariamente fora do ar');
        return false;
      }
    };
}
