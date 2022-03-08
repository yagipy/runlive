import {Flex, Heading, Text} from "@chakra-ui/react";
import React from "react";

interface Props {
    handleRun: () => void
}

export const Header = ({handleRun}: Props) => {
    return (
        <Flex as="header" w="100%" bg="#343434" h="80px" align="center" padding={6} justify="space-between">
            <Heading color="white">runlive</Heading>
            <Flex fontSize='lg'>
                <Text color="white" padding={6} cursor="pointer" _hover={{ bg: "#262626"}}>languages</Text>
                <Text color="white" padding={6} cursor="pointer" _hover={{ bg: "#262626"}}>versions</Text>
                <Text color="white" padding={6} cursor="pointer" _hover={{ bg: "#262626"}} onClick={handleRun}>run</Text>
                <Text color="white" padding={6} cursor="pointer" _hover={{ bg: "#262626"}}>share</Text>
                <Text color="white" padding={6} cursor="pointer" _hover={{ bg: "#262626"}}>connect</Text>
                <Text color="white" padding={6} cursor="pointer" _hover={{ bg: "#262626"}}>deploy</Text>
            </Flex>
        </Flex>
    )
}
