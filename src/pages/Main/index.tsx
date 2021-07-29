import { Input, Button, Flex, UnorderedList, ListItem, Text } from '@chakra-ui/react';
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom'
import {jsUcfirst} from '../../utils/firstUpperCase'
import { EndPoint } from '../../constants'
import {IClient}from '../../types'

export default function Main() {
    const apiEndPoint = EndPoint

    const [data, setData] = useState<IClient[]>([])
    const [searchTerm, setSearchTerm] = useState("");
    const [searchResults, setSearchResults] = useState<IClient[]>([]);
    const handleChange = (event:React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value);
    };

    useEffect(()=>{
        fetch(`https://crudcrud.com/api/${apiEndPoint}/clients`).then(response => {
            response.json().then(clients => {
                setData(clients);
            });
        })
    },[apiEndPoint]);

    useEffect(() => {
        const results = data.filter( objData =>
          objData.name.toLowerCase().includes(searchTerm)
        );
        setSearchResults(results);
    }, [searchTerm,data]);
    
    return(
        <Flex 
            flexDirection="column"
            align="center"
            justify="center"
            w="100%"
            maxWidth="3xl"
        >
            <Flex
                flexDirection="column"
                align="center"
                justify="center"
            >
                <Link to='/new-client'>
                    <Button 
                        bg="button.bg" 
                        color="button.color"
                    >
                        + Cliente
                    </Button>
                </Link>
            </Flex>
            <Flex
                p="0.2rem"
                mt="0.2rem"
                flexDirection="column"
                align="center"
                justify="center"
                bg="#3f75a9"
                w="100%"
                borderRadius="0.3rem"
            >
                <Input 
                    type="text"
                    variant="outline" 
                    placeholder="Pesquise à vontade..."
                    bg="white"
                    value={searchTerm}
                    onChange={handleChange}
                />
                <Flex
                    w="100%"
                    alignItems="center"
                    justifyContent="center"
                >
                    <UnorderedList
                        display="flex"
                        flexDirection="column"
                        alignItems="center"
                        justifyContent="center"
                        w="100%"
                        p="0.2rem"
                        m="0"
                    >
                        {searchResults.map(client => (
                            <ListItem 
                                display= "flex"
                                justifyContent="space-between"
                                key={client._id}
                                listStyleType="none"
                                m="0.1rem"
                                w="100%"
                                color="#434343"
                                backgroundColor="#e8e8e8"
                                borderRadius="0.3rem"
                                p="0 0.5rem"
                                fontSize="x-large"
                                fontFamily="Gelion Regular"
                                fontWeight="400"   
                            >
                                <Text>
                                    {jsUcfirst(client.name)}
                                </Text>
                                <Link to={`/client/${client._id}`}>
                                <Text 
                                    fontSize="large"
                                    fontWeight="extrabold"
                                    textAlign="center"
                                    letterSpacing="widest"
                                >
                                    ...
                                </Text>
                                </Link>
                            </ListItem>
                        ))}
                    </UnorderedList>
                </Flex>
            </Flex>
        </Flex>
    )
}