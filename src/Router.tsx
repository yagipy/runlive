import Editor from "@monaco-editor/react";
import React from "react";
import {Header} from "@/Header";
import {Flex} from "@chakra-ui/react";
const code = 'export const a = "test";'

export const Router = () => {
    return (
        <div>
            <Header />
            <Flex as="main">
                <Editor
                    height="100vh"
                    defaultLanguage="javascript"
                    defaultValue={code}
                    theme="vs-dark"
                    options={{
                        fontSize: 14,
                        minimap: {
                            enabled: false
                        }
                    }}
                />
            </Flex>
        </div>
    )
}
