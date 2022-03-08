import {useEffect, useState} from "react";

export const useDynamicImportBy = (library: string) => {
    const [state, setState] = useState(null)
    useEffect(() => {
        ;(async () => {
            const wasmContainer = await import(`${library}`)
            setState(wasmContainer)
        })()
    }, [])
    return state
}
