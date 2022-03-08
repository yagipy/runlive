import React from "react"
import {Box} from "@chakra-ui/react";

interface Props {
    result: any
}

export const Result = ({result}: Props) => {
    return (
        <Box w='100%' bg="black" paddingX={8} paddingY={25} color="white" h="25%" overflow="auto">
            <code style={{whiteSpace: "pre-wrap"}}>
                {result}
            </code>
        </Box>
    )
}
