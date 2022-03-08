import {useEffect, useState} from "react";

export const usePyodide = (): any => {
    const [state, setState] = useState(null)
    useEffect(() => {
        ;(async () => {
            // @ts-ignore
            const pyodidePkg = await import("pyodide/pyodide.js")
            const pyodide = await pyodidePkg.loadPyodide({
                indexURL: "https://cdn.jsdelivr.net/pyodide/v0.19.1/full/",
            });
            setState(pyodide)
        })()
    }, [])
    return state
}
