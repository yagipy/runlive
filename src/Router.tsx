import Editor from "@monaco-editor/react";
import React, {useEffect, useRef, useState} from "react";
import {Header} from "@/Header";
import {Flex} from "@chakra-ui/react";
import * as Y from "yjs";
import {WebrtcProvider} from "y-webrtc";
import {Result} from "@/Result";
import {useDynamicImportBy} from "@/hooks/useDynamicImportBy";

const code = 'export const a = "test";'

export const Router = () => {
    const doc = useRef(new Y.Doc());
    const sharedString = useRef(doc.current.getText());
    const [inputValue, setInputValue] = useState(
        sharedString.current.toString() ?? ""
    );
    const [result, setResult] = useState("")

    useEffect(() => {
        new WebrtcProvider("room", doc.current);
        sharedString.current.observeDeep(() => {
            setInputValue(sharedString.current.toString());
        });
    }, []);

    const handleChange = (value: string | undefined, event: any) => {
        if (sharedString.current.toString()) {
            sharedString.current.delete(0, sharedString.toString().length);
        }

        console.log("value", value)
        // TODO: 差分更新ではなくなる
        // Y.applyUpdateV2()sharedString.current.(0, value ?? "");
        setInputValue(value ?? "")
    };

    const handleRun = async () => {
        // @ts-ignore
        const pyodidePkg = await import("pyodide/pyodide.js");
        const pyodide = await pyodidePkg.loadPyodide({
            indexURL: "https://cdn.jsdelivr.net/pyodide/v0.19.1/full/",
        });
        // https://github.com/subwaymatch/gold-is/blob/20ea2fd0ece41e6421ae22c0ee73c88497a6e3a2/lib/pyodide/manager.ts
        pyodide.runPython(`import io, sys
import pyodide
sys.stdout = io.StringIO()
sys.stderr = io.StringIO()`)
        // TODO: resultも必要?
        pyodide.runPython(inputValue)
        const stdout = pyodide.runPython("sys.stdout.getvalue()")
        setResult(stdout)
    }

    return (
        <div>
            <Header handleRun={handleRun}/>
            <Flex as="main">
                <Editor
                    onChange={handleChange}
                    height="60vh"
                    defaultLanguage="python"
                    defaultValue={code}
                    theme="vs-dark"
                    options={{
                        fontSize: 14,
                        minimap: {
                            enabled: false
                        }
                    }}
                    value={inputValue}
                />
            </Flex>
            <Result result={result}/>
        </div>
    )
}
