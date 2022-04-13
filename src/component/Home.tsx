import React, {useEffect, useRef, useState} from "react";
import * as Y from "yjs";
import {usePyodide} from "@internal/hook/usePyodide";
import {WebrtcProvider} from "y-webrtc";
import {Box, Flex} from "@chakra-ui/react";
import {Header} from "@internal/component/Header";
import Editor, {Monaco} from "@monaco-editor/react";
import {Result} from "@internal/component/Result";
import {encode, decode} from "@internal/lib/share"
import {MakeGenerics, useNavigate, useSearch} from "@tanstack/react-location";
// @ts-ignore
import { MonacoBinding } from 'y-monaco'
import * as monaco from "monaco-editor";
import { v4 as uuidv4 } from 'uuid';

type SearchGenerics = MakeGenerics<{
  Search: {
    shareToken?: string
    connectToken?: string
  }
}>

export const Home = () => {
  // ref
  const doc = useRef(new Y.Doc())
  const sharedString = useRef(doc.current.getText())
  // state
  const [inputValue, setInputValue] = useState(sharedString.current.toString() ?? "export const a = 'test';")
  const [result, setResult] = useState("")
  const [language, setLanguage] = useState("python")
  // const [ed, setEd] = useState<monaco.editor.IStandaloneCodeEditor|null>(null)
  // custom hook
  const navigate = useNavigate()
  const search = useSearch<SearchGenerics>();
  const pyodide = usePyodide()

  useEffect(() => {
    const decoded = decode(search.shareToken ?? "")
    setInputValue(decoded)
  }, [])

  const handleRun = async () => {
    let stdout
    switch (language) {
      case "python":
        // https://github.com/subwaymatch/gold-is/blob/20ea2fd0ece41e6421ae22c0ee73c88497a6e3a2/lib/pyodide/manager.ts
        pyodide.runPython(`import io, sys
import pyodide
sys.stdout = io.StringIO()
sys.stderr = io.StringIO()`)
        pyodide.runPython(inputValue)
        stdout = pyodide.runPython("sys.stdout.getvalue()")
        break
      default:
        stdout = `Sorry, ${language} execution id not supported yet.`
        break
    }
    setResult(stdout)
  }

  const handleShare = () => {
    const encoded = encode(inputValue)
    navigate({ to: "./", replace: true , search: () => ({shareToken: encoded})})
  }

  const handleConnect = () => {
    const connectToken = uuidv4()
    navigate({ to: "./", replace: true , search: () => ({connectToken: connectToken})})
    // const provider = new WebrtcProvider(connectToken, doc.current)
    // new MonacoBinding(doc.current.getText(), ed?.getModel(), new Set([ed]), provider.awareness)
  }

  const handleMount = (editor: monaco.editor.IStandaloneCodeEditor, _: Monaco) => {
    if (search.connectToken) {
      setInputValue(sharedString.current.toString())
      const provider = new WebrtcProvider(search.connectToken, doc.current)
      new MonacoBinding(doc.current.getText(), editor.getModel(), new Set([editor]), provider.awareness)
    }
    // setEd(editor)
  }

  const handleChange = (value: string | undefined, _: any) => {
    console.log("handleChange", value)
    // ここがガーっとなる原因
    setInputValue(value ?? "")
  };

  return (
    <Box h="100vh">
      <Header handleRun={handleRun} language={language} handleChangeLanguage={(language) => setLanguage(language)} handleShare={handleShare} handleConnect={handleConnect}/>
      <Flex as="main">
        <Editor
          onChange={handleChange}
          height="65vh"
          language={language}
          theme="vs-dark"
          options={{
            fontSize: 14,
            minimap: {
              enabled: false
            }
          }}
          value={inputValue}
          onMount={handleMount}
        />
      </Flex>
      <Result result={result}/>
    </Box>
  )
}
