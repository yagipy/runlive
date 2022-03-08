import {Flex, Heading, Text} from "@chakra-ui/react";
import React from "react";

export const Header = () => {
    return (
        <Flex as="header" w="100%" bg="#343434" h="80px" align="center" padding={6} justify="space-between">
            <Heading color="white">runlive</Heading>
            <Flex fontSize='lg'>
                <Text color="white" padding={6} cursor="pointer" _hover={{ bg: "#262626"}}>languages</Text>
                <Text color="white" padding={6} cursor="pointer" _hover={{ bg: "#262626"}}>versions</Text>
                <Text color="white" padding={6} cursor="pointer" _hover={{ bg: "#262626"}}>run</Text>
                <Text color="white" padding={6} cursor="pointer" _hover={{ bg: "#262626"}}>share</Text>
                <Text color="white" padding={6} cursor="pointer" _hover={{ bg: "#262626"}}>connect</Text>
            </Flex>
        </Flex>
    )
}
