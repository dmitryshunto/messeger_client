import { Button } from "antd"
import React from "react"
import css from './TextInput.module.css'

type Props = {
    value: string
    setValue: (str: string) => void
    onClick: () => any
    buttonText: string
}

const TextInput: React.FC<Props> = (props) => {
    return (
        <div className = {css.textInput}>
            <textarea
                className={css.textArea} 
                value = {props.value}
                onChange = {e => props.setValue(e.currentTarget.value)}
            />
            <Button 
                disabled = {!!!props.value}
                onClick={props.onClick}
                type= 'primary'
            >
                    {props.buttonText}
            </Button>
        </div>
    )
}

export default TextInput