import React from 'react'

type Props = {
    message: string | null
}

const ErrorMessage: React.FC<Props> = ({message}) => {
    if(!message) return null
    return (
        <div>{message}</div>
    )
}

export default ErrorMessage