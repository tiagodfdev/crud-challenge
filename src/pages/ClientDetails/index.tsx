import React, { useEffect, useState } from 'react';
import { useParams, useHistory } from 'react-router-dom'
import { Button, Flex } from '@chakra-ui/react';
import { Client } from '../../Entities/Client';
import { EndPoint } from '../../constants'
import MyFormControl from '../../components/MyFormControl';
import {IClient}from '../../types'


export default function ClientDetails() {
    const apiEndPoint = EndPoint
    let history = useHistory()

    const {id}:any = useParams();
    const [data, setData] = useState<IClient>()
    const [isDisableEditStatus, setisDisableEditStatus ] = useState(true)
    const [buttonLabel, setButtonLabel ] = useState("Editar")
    const [name, setName] = useState<string>("")
    const [cpf, setCpf] = useState<string>("")
    const [email, setEmail] = useState<string>("")
    const [phone, setPhone] = useState<string>("")
    const [submitState, setSubmitState] = useState(false)
    
    useEffect(()=>{
        fetch(`https://crudcrud.com/api/${apiEndPoint}/clients/${id}`).then(response => {
            response.json().then(clients => {
                setData(clients);
            });
        })
    },[id,apiEndPoint]);

    function editAndSubmitClick(e:React.FormEvent){
        e.preventDefault()
        if(isDisableEditStatus){
            setName(data!.name)
            setCpf(data!.cpf)
            setEmail(data!.contact.email)
            setPhone(data!.contact.phone)
            setisDisableEditStatus(false)
            setButtonLabel("Modificar")
            return
        }
        if(!isDisableEditStatus){
            onSubmit(e)
            setisDisableEditStatus(true)
            setButtonLabel("Editar")
        }
    }

    function handleInputChange(e:React.ChangeEvent<HTMLInputElement>) {
        e.preventDefault()
        const target = e.target;
        const name = target.name;
        const value = target.value;
        switch (name){
          case 'name':
            setName(value)
            break
          case 'cpf':
            setCpf(value)
            break
          case 'email':
            setEmail(value)
            break
          case 'phone':
            setPhone(value)
            break
          default:
            console.log('error')
        }
    }
    const handlePress = async (body:Client) => {
        const res = await fetch(`https://crudcrud.com/api/${apiEndPoint}/clients/${id}`, {
        method: 'PUT',
        headers: { 
          'Host': 'crudcrud.com',
          'Content-Type': 'application/json',
          'Accept': '*/*'
        },
        body: JSON.stringify(body)})
        if(res.status>=200 && res.status<299){
            setSubmitState(false)
            alert('Modificado com sucesso')
            history.push("/")
        }
        if(res.status>=300 || false){
            setSubmitState(false)
            alert('Serviço temporariamente fora do ar')
        }
    }
    const deleteClick = async () => {
        const res = await fetch(`https://crudcrud.com/api/${apiEndPoint}/clients/${id}`, {
            method: 'DELETE',
            headers: { 
            'Host': 'crudcrud.com',
            'Content-Type': 'application/json',
            'Accept': '*/*'
            }
        })
        if(res.status>=200 && res.status<299){
            alert('Deletado com sucesso')
            history.push("/")
        }
        if(res.status>=300 || false){
            alert('Serviço temporariamente fora do ar')
        }
    }
    const onSubmit = async (e:React.FormEvent) => {
        e.preventDefault()
        const bodySend = new Client(name, cpf, email, phone)
        setSubmitState(true)
    handlePress(bodySend)
    }

    return(
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
            <form style={{width:"100%"}} id="editForm">
                <MyFormControl id="name" label="Nome" type="text" placeholder={data?.name} isDisableEditStatus={isDisableEditStatus} handleInputChange={handleInputChange}/>
                <MyFormControl id="cpf" label="CPF" type="text" placeholder={data?.cpf} isDisableEditStatus={isDisableEditStatus} handleInputChange={handleInputChange}/>
                <MyFormControl id="email" label="E-mail" type="email" placeholder={data?.contact.email} isDisableEditStatus={isDisableEditStatus} handleInputChange={handleInputChange}/>
                <MyFormControl id="phone" label="Telefone" type="text" placeholder={data?.contact.phone} isDisableEditStatus={isDisableEditStatus} handleInputChange={handleInputChange}/>
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