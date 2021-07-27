import React from "react";
import { Flex } from "@chakra-ui/react";


const Header = (): JSX.Element => {
    return (
        <Flex
            as="header"
            bottom="0"
            w="100%"
            align="center"
            justify="center"
            padding="0.4rem 0"
            bg="transparent"
            color="black"
            direction="column"
            mt="1rem"
         >
             <Flex>
                <a href="/">
                    <img src="https://static.nagem.com.br/util/artefatos/asset/n/9821596550697/img/layout/logoNagem.png" alt="Nagem"/>
                </a>
             </Flex>
        </Flex>
    );
};

export default Header;