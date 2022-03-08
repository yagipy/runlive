import React from "react";
import {ChakraProvider} from "@chakra-ui/react";
import {Router} from "@/Router";

export const App = () => {
    return (
        <ChakraProvider>
            <Router/>
        </ChakraProvider>
    )
}
