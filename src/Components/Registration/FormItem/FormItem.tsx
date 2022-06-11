import { Form, Input } from 'antd'
import { Rule } from 'antd/lib/form'
import React from 'react'
import { UserRegistrationData } from '../../../types/users'

type Props = {
    name: keyof UserRegistrationData
    isPassword: boolean
    placeHolder?: string
    rules?: Rule[]
    errorMesage?: string
}

const FormItem: React.FC<Props> = (props) => {
    const InputComponent = props.isPassword ? Input.Password : Input
    let placeHolder = props.placeHolder ? props.placeHolder : props.name
    let message = `Please input ${placeHolder}`
    if (props.name === 'confirmPassword') message = `Please confirm your password!`
    let requiredRule: Rule = { required: true, message }
    let rules = props.rules ? [...props.rules, requiredRule] : [requiredRule]
    let validateStatus: 'error' | undefined
    if (props.errorMesage) validateStatus = 'error'
    return (
        <Form.Item
            name={props.name}
            label={props.placeHolder || props.name}
            rules={rules}
            validateStatus={validateStatus}
            help={props.errorMesage}
        >
            <InputComponent
                placeholder={placeHolder}
            />
        </Form.Item>
    )
}

export default FormItem