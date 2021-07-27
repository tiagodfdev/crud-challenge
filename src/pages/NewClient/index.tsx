import { FormControl, Input, Flex, Button, InputGroup, InputLeftAddon} from '@chakra-ui/react'
import React, {useState} from 'react';
import { useHistory } from 'react-router-dom'
import { Client } from '../../Entities/Client';
import { EndPoint } from '../../constants'

export default function NewClient() {
  const apiEndPoint = EndPoint
  let history = useHistory()

  const [name, setName] = useState("")
  const [cpf, setCpf] = useState("")
  const [email, setEmail] = useState("")
  const [phone, setPhone] = useState("")
  const [submitState, setSubmitState] = useState(false)

  function handleInputChange(e:React.ChangeEvent<HTMLInputElement>) {
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
    const res = await fetch(`https://crudcrud.com/api/${apiEndPoint}/clients`, {
    method: 'POST',
    headers: { 
      'Host': 'crudcrud.com',
      'Content-Type': 'application/json',
      'Accept': '*/*'
    },
    body: JSON.stringify(body)})
    if(res.status>=200 && res.status<299){
      setSubmitState(false)
      alert('Cliente criado com sucesso!')
      history.push("/")
    }
    if(res.status>=300 || false){
      setSubmitState(false)
      alert('Serviço de e-mail temporariamente fora do ar')
    }
  }
    const onSubmit = async (e:React.FormEvent) => {
      e.preventDefault()
      const bodySend = new Client(name, cpf, email, phone)
      setSubmitState(true)

    handlePress(bodySend)
    }
  return (
    <Flex flexDirection="column" w="100%" maxWidth="3xl">
     <form onSubmit={onSubmit} >
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
          <Input
            name="name" 
            type="text" 
            _placeholder={{color:"#434343"}} 
            placeholder="NOME*"
            onChange={handleInputChange} 
          />
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
          <Input
            name="cpf"
            type="text" 
            _placeholder={{color:"#434343"}} 
            placeholder="CPF*"
            onChange={handleInputChange} 
          />
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
          <Input
            name="email"
            type="email" 
            _placeholder={{color:"#434343"}} 
            placeholder="E-MAIL*"
            onChange={handleInputChange} 
          />
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
          <Input
            name="phone"
            type="text" 
            _placeholder={{color:"#434343"}} 
            placeholder="TELEFONE*"
            onChange={handleInputChange} 
          />
        </InputGroup>
      </FormControl>

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
  )
  }
