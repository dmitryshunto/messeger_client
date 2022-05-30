import { Button, Form } from 'antd'
import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { AppDispatch } from '../../redux/redux'
import { UserRegistrationData } from '../../types/users'
import authSelectors from '../../selectors/auth'
import { actions as authActions, createUser } from '../../redux/authorizationReducer'
import WelcomePage from '../WelcomePage/WelcomePage'
import { routes } from '../../config'
import { Navigate } from 'react-router-dom'
import FormItem from './FormItem/FormItem'
import { getValidationErrorByFieldName } from '../../functions/common'
import { Rule } from 'antd/lib/form'
import ErrorMessage from '../ErrorMessage/ErrorMessage'

type FieldDataItem = {
    isPassword: boolean
    name: keyof UserRegistrationData
    placeHolder?: string
    rules?: Rule[]
}

const RegistrationPage: React.FC = () => {
    const dispatch: AppDispatch = useDispatch()
    const isGettingData = useSelector(authSelectors.isGettingData)
    const userData = useSelector(authSelectors.data)
    const creatingUserSuccessMessage = useSelector(authSelectors.creatingUserSuccessMessage)
    const validationErrors = useSelector(authSelectors.validationErrors)
    const errorMessage = useSelector(authSelectors.errorMessage)

    useEffect(() => {
        return () => {
            dispatch(authActions.setInitialState())
        }
    }, [dispatch])

    if(creatingUserSuccessMessage) {
        return <WelcomePage message = {creatingUserSuccessMessage}/>
    }
    
    if(userData && !creatingUserSuccessMessage) {
        return <Navigate to = {routes['myProfile']} />
    }
    
    const onFinish = (values: UserRegistrationData) => {
        dispatch(createUser(values))
    }

    const dataItems: FieldDataItem[] = [
        {
            name: 'login',
            isPassword: false
        },
        {
            name: 'email',
            isPassword: false,
            rules: [{ type: 'email', message: 'Please input correct email!'}]
        },
        {
            name: 'firstName',
            isPassword: false,
            placeHolder: 'first name',
        },
        {
            name: 'lastName',
            isPassword: false,
            placeHolder: 'last name',
        },
        {
            name: 'password',
            isPassword: true,
        },
        {
            name: 'confirmPassword',
            isPassword: true,
            placeHolder: 'confirm password'
        }
    ]

    const formItems = dataItems.map(item => {
        return (
            <FormItem 
                isPassword = {item.isPassword}
                name = {item.name}
                key = {item.name}
                errorMesage = {getValidationErrorByFieldName(item.name, validationErrors)}
                placeHolder = {item.placeHolder}
                rules = {item.rules}
            />
        )
    })

    return (
        <div>
            <Form
                name="login"
                onFinish={onFinish}
                autoComplete = {'on'} 
            >
                {
                    formItems
                }
                <Form.Item>
                    <Button disabled = {isGettingData} type="primary" htmlType="submit">
                        Submit
                    </Button>
                </Form.Item>
            </Form>
            <ErrorMessage 
                message={errorMessage}
            />
        </div>
    )
}

export default RegistrationPage