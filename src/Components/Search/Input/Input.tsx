import React, { useState } from 'react'

type Props = {
    callback: (str: string) => void
}

const Input: React.FC<Props> = (props) => {
    const [value, setValue] = useState('')
    return (
        <div>
            <input 
                type = 'text'
                value = {value}
                onChange = {(e) => {
                    setValue(e.currentTarget.value)
                    props.callback(e.currentTarget.value)
                }} 
            />
        </div>
    )
}

export default Input