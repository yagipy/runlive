import React, {useEffect, useRef, useState} from "react";
import * as Y from "yjs";
import {usePyodide} from "@internal/hook/usePyodide";
import {WebrtcProvider} from "y-webrtc";
import {Box, Flex} from "@chakra-ui/react";
import {Header} from "@internal/component/Header";
import Editor from "@monaco-editor/react";
import {Result} from "@internal/component/Result";
import {encode, decode} from "@internal/lib/share"
import {MakeGenerics, useNavigate, useSearch} from "@tanstack/react-location";

type SearchGenerics = MakeGenerics<{
  Search: {
    token?: string
  }
}>


export const Home = () => {
  const doc = useRef(new Y.Doc())
  const sharedString = useRef(doc.current.getText())
  const [inputValue, setInputValue] = useState(sharedString.current.toString() ?? "export const a = 'test';")
  const [result, setResult] = useState("")
  const [language, setLanguage] = useState("python")
  const navigate = useNavigate()
  const search = useSearch<SearchGenerics>();
  const pyodide = usePyodide()

  useEffect(() => {
    new WebrtcProvider("room", doc.current);
    sharedString.current.observeDeep(() => {
      setInputValue(sharedString.current.toString());
    })

    const decoded = decode(search.token ?? "")
    setInputValue(decoded)
  }, [])

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

  const handleShare = () => {
    const encoded = encode(inputValue)
    navigate({ to: "./", replace: true , search: () => ({token: encoded})})
  }

  return (
    <Box h="100vh">
      <Header handleRun={handleRun} language={language} handleChangeLanguage={(language) => setLanguage(language)} handleShare={handleShare}/>
      <Flex as="main">
        <Editor
          onChange={handleChange}
          height="65vh"
          language={language}
          defaultValue={inputValue}
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
    </Box>
  )
}
