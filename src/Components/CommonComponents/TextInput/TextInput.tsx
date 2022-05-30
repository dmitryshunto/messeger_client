import React from "react"

type Props = {
    value: string
    setValue: (str: string) => void
    onClick: () => any
    buttonText: string
}

const TextInput: React.FC<Props> = (props) => {
    return (
        <div>
            <input 
                type={'text'}
                value = {props.value}
                onChange = {e => props.setValue(e.currentTarget.value)}
            />
            <button disabled = {!!!props.value} onClick={props.onClick}>{props.buttonText}</button>
        </div>
    )
}

export default TextInput