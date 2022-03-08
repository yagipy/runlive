import React from "react"

interface Props {
    result: any
}

export const Result = ({result}: Props) => {
    return (
        <div style={{ bottom: 0, height: 100}}>{result}</div>
    )
}
