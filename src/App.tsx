import React from "react";
import {ChakraProvider} from "@chakra-ui/react";
import {Router, Outlet} from "@tanstack/react-location";
import {routes, location} from "@internal/Router";

export const App = () => {
    return (
        <ChakraProvider>
            <Router routes={routes} location={location}>
              <Outlet />
            </Router>
        </ChakraProvider>
    )
}
