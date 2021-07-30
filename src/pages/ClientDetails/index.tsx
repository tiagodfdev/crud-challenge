/* eslint-disable no-unused-expressions */
/* eslint-disable no-underscore-dangle */
/* eslint-disable no-console */
/* eslint-disable no-alert */
import React, { useEffect, useState } from 'react';
import { useParams, useHistory } from 'react-router-dom';
import { Button, Flex } from '@chakra-ui/react';
import Client from '../../Entities/Client';
import { EndPoint } from '../../constants';
import MyFormControl from '../../components/MyFormControl';

export default function ClientDetails() {
  const history = useHistory();

  const { id } = useParams<{id:string}>();
  const [data, setData] = useState<Client>();
  const [isDisableEditStatus, setisDisableEditStatus] = useState(true);
  const [buttonLabel, setButtonLabel] = useState('Editar');
  const [name, setName] = useState<string>('');
  const [cpf, setCpf] = useState<string>('');
  const [email, setEmail] = useState<string>('');
  const [phone, setPhone] = useState<string>('');
  const [submitState, setSubmitState] = useState(false);

  useEffect(() => {
    fetch(`https://crudcrud.com/api/${EndPoint}/clients/${id}`).then((response) => {
      response.json().then((clients) => {
        const client = new Client(clients!.name,
            clients!.cpf,
            clients!.contact.email,
            clients!.contact.phone,
            EndPoint,
            clients?._id);
        setData(client);
      });
    });
  }, [id, EndPoint]);

  const onSubmit = async (e:React.FormEvent) => {
    e.preventDefault();
    const bodySend = new Client(name, cpf, email, phone, EndPoint, id);
    setSubmitState(true);
    await bodySend.updClient(setSubmitState);
    history.push('/');
  };

  function editAndSubmitClick(e:React.FormEvent) {
    e.preventDefault();
    if (isDisableEditStatus) {
      setName(data!.name);
      setCpf(data!.cpf);
      setEmail(data!.contact.email);
      setPhone(data!.contact.phone);
      setisDisableEditStatus(false);
      setButtonLabel('Modificar');
      return;
    }
    if (!isDisableEditStatus) {
      onSubmit(e);
      setisDisableEditStatus(true);
      setButtonLabel('Editar');
    }
  }

  const deleteClick = async () => {
    await data!.rmClient();
    history.push('/');
  };

  return (
    <Flex
      display="flex"
      flexDirection="column"
      alignItems="center"
      justifyContent="center"
      w="100%"
      p="0.2rem"
      m="0"
      maxWidth="3xl"
    >
      <form style={{ width: '100%' }} id="editForm">
        <MyFormControl id="name" label="Nome" type="text" placeholder={data?.name} isDisableEditStatus={isDisableEditStatus} setStateTarget={setName} />
        <MyFormControl id="cpf" label="CPF" type="text" placeholder={data?.cpf} isDisableEditStatus={isDisableEditStatus} setStateTarget={setCpf} />
        <MyFormControl id="email" label="E-mail" type="email" placeholder={data?.contact.email} isDisableEditStatus={isDisableEditStatus} setStateTarget={setEmail} />
        <MyFormControl id="phone" label="Telefone" type="text" placeholder={data?.contact.phone} isDisableEditStatus={isDisableEditStatus} setStateTarget={setPhone} />
      </form>
      <Flex
        flexDirection="row"
        alignItems="center"
        justifyContent="center"
      >
        <Button
          bg="button.bg"
          color="button.color"
          m="0 0.2rem"
          onClick={editAndSubmitClick}
          isLoading={submitState}
        >
          {buttonLabel}
        </Button>
        <Button
          bg="button.bg"
          color="button.color"
          m="0 0.2rem"
          onClick={deleteClick}
        >
          Deletar
        </Button>
      </Flex>
    </Flex>
  );
}
