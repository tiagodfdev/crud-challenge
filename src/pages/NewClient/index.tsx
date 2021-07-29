/* eslint-disable react/no-children-prop */
/* eslint-disable no-alert */
/* eslint-disable no-console */
/* eslint-disable no-shadow */
import {
  Flex, Button,
} from '@chakra-ui/react';
import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import Client from '../../Entities/Client';
import { EndPoint } from '../../constants';
import MyFormControl from '../../components/MyFormControl';

export default function NewClient() {
  const apiEndPoint = EndPoint;
  const history = useHistory();

  const [name, setName] = useState('');
  const [cpf, setCpf] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [submitState, setSubmitState] = useState(false);

  function handleInputChange(e:React.ChangeEvent<HTMLInputElement>) {
    const { target } = e;
    const { name } = target;
    const { value } = target;
    switch (name) {
      case 'name':
        setName(value);
        break;
      case 'cpf':
        setCpf(value);
        break;
      case 'email':
        setEmail(value);
        break;
      case 'phone':
        setPhone(value);
        break;
      default:
        console.log('error');
    }
  }
  const handlePress = async (body:Client) => {
    const res = await fetch(`https://crudcrud.com/api/${apiEndPoint}/clients`, {
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
      history.push('/');
    }
    if (res.status >= 300 || false) {
      setSubmitState(false);
      alert('Serviço de e-mail temporariamente fora do ar');
    }
  };
  const onSubmit = async (e:React.FormEvent) => {
    e.preventDefault();
    const bodySend = new Client(name, cpf, email, phone);
    setSubmitState(true);
    handlePress(bodySend);
  };
  return (
    <Flex flexDirection="column" w="100%" maxWidth="3xl">
      <form onSubmit={onSubmit}>
        <MyFormControl id="name" label="Nome" type="text" placeholder="NOME*" handleInputChange={handleInputChange} />
        <MyFormControl id="cpf" label="CPF" type="text" placeholder="CPF*" handleInputChange={handleInputChange} />
        <MyFormControl id="email" label="E-mail" type="email" placeholder="E-MAIL*" handleInputChange={handleInputChange} />
        <MyFormControl id="phone" label="Telefone" type="text" placeholder="TELEFONE*" handleInputChange={handleInputChange} />

        <Button
          bg="button.bg"
          color="button.color"
          m="0 0.2rem"
          isLoading={submitState}
          loadingText="Enviando..."
          type="submit"
        >
          Adicionar
        </Button>
      </form>
    </Flex>
  );
}
