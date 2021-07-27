import React, { useEffect, useState } from 'react';
import { useParams, useHistory } from 'react-router-dom'
import {FormControl, Input, Button, Flex, InputGroup, InputLeftAddon } from '@chakra-ui/react';
import { Client } from '../../Entities/Client';
import { EndPoint } from '../../constants'


interface IClient {
    _id:number;
    name:string;
    cpf:string;
    contact:{email:string,phone:string}
}


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
        console.log(value)
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
                <FormControl
                    isRequired
                    id="name"
                    display= "flex"
                    listStyleType="none"
                    m="0.2rem"
                    w="100%"
                    color="#434343"
                    backgroundColor="#e8e8e8"
                    borderRadius="0.3rem"
                    fontSize="x-large"
                    fontFamily="Gelion Regular"
                    fontWeight="400"  
                >
                    <InputGroup>
                        <InputLeftAddon bg="#3f75a9" children="Nome" />
                        <Input name="name" isDisabled={isDisableEditStatus} type="text" _placeholder={{color:"black"}} placeholder={data?.name} onChange={handleInputChange} />
                    </InputGroup>
                </FormControl>


                <FormControl
                    isRequired
                    id="cpf"
                    display= "flex"
                    listStyleType="none"
                    m="0.2rem"
                    w="100%"
                    color="#434343"
                    backgroundColor="#e8e8e8"
                    borderRadius="0.3rem"
                    fontSize="x-large"
                    fontFamily="Gelion Regular"
                    fontWeight="400" 
                >
                    <InputGroup>
                        <InputLeftAddon bg="#3f75a9" children="CPF" />
                        <Input name="cpf" isDisabled={isDisableEditStatus} type="text" _placeholder={{color:"black"}} placeholder={data?.cpf} onChange={handleInputChange} />
                    </InputGroup>
                </FormControl>


                <FormControl
                    isRequired
                    id="email"
                    display= "flex"
                    listStyleType="none"
                    m="0.2rem"
                    w="100%"
                    color="#434343"
                    backgroundColor="#e8e8e8"
                    borderRadius="0.3rem"
                    fontSize="x-large"
                    fontFamily="Gelion Regular"
                    fontWeight="400" 
                >
                    <InputGroup>
                        <InputLeftAddon bg="#3f75a9" children="E-mail" />
                        <Input name="email" isDisabled={isDisableEditStatus} type="email" _placeholder={{color:"black"}} placeholder={data?.contact.email} onChange={handleInputChange} />
                    </InputGroup>
                </FormControl>


                <FormControl
                    isRequired
                    id="phone"
                    display= "flex"
                    listStyleType="none"
                    m="0.2rem"
                    w="100%"
                    color="#434343"
                    backgroundColor="#e8e8e8"
                    borderRadius="0.3rem"
                    fontSize="x-large"
                    fontFamily="Gelion Regular"
                    fontWeight="400" 
                >
                    <InputGroup>
                        <InputLeftAddon bg="#3f75a9" children="Telefone" />
                        <Input name="phone" isDisabled={isDisableEditStatus} type="text" _placeholder={{color:"black"}} placeholder={data?.contact.phone} onChange={handleInputChange} />
                    </InputGroup>
                </FormControl>
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