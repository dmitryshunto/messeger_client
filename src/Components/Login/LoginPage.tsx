import { Button, Form, Input } from 'antd'
import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { authorizeUser } from '../../redux/authorizationReducer'
import { AppDispatch } from '../../redux/redux'
import authSelectors from '../../selectors/auth'
import { UserAuthorizationData } from '../../types/users'
import {Navigate} from 'react-router-dom'
import { routes } from '../../config'
import { withErrorMessage } from '../../HOC/withErrorMessage'

const LoginPage: React.FC = () => {
    const userData = useSelector(authSelectors.data)
    const isGettingData = useSelector(authSelectors.isGettingData)
    const dispatch: AppDispatch = useDispatch()
    
    if(userData) return <Navigate to = {routes['myProfile']}/>
    
    const onFinish = (values: UserAuthorizationData) => {
        dispatch(
            authorizeUser(values)
        )
    }

    return (
        <div>
            <Form
                name="login"
                onFinish={onFinish}
                autoComplete="off"
            >
                <Form.Item
                    label="Login"
                    name="login"
                    rules={[{ required: true, message: 'Please input your login!' }]}
                >
                    <Input 
                        placeholder='Login'
                    />
                </Form.Item>
                <Form.Item
                    label="Password"
                    name="password"
                    rules={[{ required: true, message: 'Please input your password!' }]}
                >
                    <Input.Password 
                        placeholder='Password'
                    />
                </Form.Item>
                <Form.Item>
                    <Button disabled = {isGettingData} type="primary" htmlType="submit">
                        Submit
                    </Button>
                </Form.Item>
            </Form>
        </div>
    )
}

export default withErrorMessage(LoginPage, authSelectors.errorMessage)

