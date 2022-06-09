import React from 'react'
import { useSelector } from 'react-redux'
import { Navigate } from 'react-router-dom'
import { routes } from '../config'
import authSelectors from '../selectors/auth'

export function withAuthRedirect<Props>(Component: React.FC<Props>) {
    const NewComponent: React.FC<Props> = (props) => {
        const userData = useSelector(authSelectors.data)
        if(!userData) return <Navigate to = {routes['login']} />
        return (
            <Component {...props} />
        )    
    } 
    return NewComponent
}