import React from 'react';
import {FormControl, Input, InputGroup, InputLeftAddon } from '@chakra-ui/react';
import {IForm} from '../types'




const MyFormControl = (props:IForm): JSX.Element => {
    return (
        <FormControl
            isRequired
            id={props.id}
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
                <InputLeftAddon bg="#3f75a9" children={props.label} />
                <Input name={props.id} isDisabled={props.isDisableEditStatus} type={props.type} _placeholder={{color:"black"}} placeholder={props.placeholder} onChange={props.handleInputChange} />
            </InputGroup>
        </FormControl>
    );
};

export default MyFormControl;
