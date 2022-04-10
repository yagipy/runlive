import {Flex, Heading, Menu, MenuButton, MenuItem, MenuList, Select, Text} from "@chakra-ui/react";
import React from "react";

interface Props {
    handleRun: () => void
    language: string
    handleChangeLanguage: (language: string) => void
}

export const Header = ({handleRun, language, handleChangeLanguage}: Props) => {
    return (
        <Flex as="header" w="100%" bg="#343434" h="10%" align="center" p={6} justify="space-between" color="white">
            <Heading color="white">runlive</Heading>
            <Flex fontSize='lg' align="center">
              <Menu>
                <MenuButton p={6} _hover={{ bg: "#262626"}}>{language}</MenuButton>
                <MenuList bg="#343434">
                  <MenuItem onClick={() => handleChangeLanguage("python")} _hover={{ bg: "#262626"}} _focus={{ bg: "#262626"}}>python</MenuItem>
                  <MenuItem onClick={() => handleChangeLanguage("javascript")} _hover={{ bg: "#262626"}} _focus={{ bg: "#262626"}}>javascript</MenuItem>
                  <MenuItem onClick={() => handleChangeLanguage("ruby")} _hover={{ bg: "#262626"}} _focus={{ bg: "#262626"}}>ruby</MenuItem>
                  <MenuItem onClick={() => handleChangeLanguage("go")} _hover={{ bg: "#262626"}} _focus={{ bg: "#262626"}}>go</MenuItem>
                </MenuList>
              </Menu>
                <Text color="white" p={6} cursor="pointer" _hover={{ bg: "#262626"}} onClick={handleRun}>run</Text>
                <Text color="white" p={6} cursor="pointer" _hover={{ bg: "#262626"}}>share</Text>
                <Text color="white" p={6} cursor="pointer" _hover={{ bg: "#262626"}}>connect</Text>
                <Text color="white" p={6} cursor="pointer" _hover={{ bg: "#262626"}}>deploy</Text>
            </Flex>
        </Flex>
    )
}
