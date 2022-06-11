import React from 'react'
import css from './WelcomePage.module.css'

const WelcomePage: React.FC<{ message: string }> = ({ message }) => {
    return (
        <div className={css.welcomePage}>
            <div className={css.header}>
                {message}
            </div>
            <div className={css.instruction}>
                For activation your account, please, check your email and follow the link in activation mail. 
                If you haven't received the activation mail check the spam folder.
            </div>
        </div>
    )
}

export default WelcomePage