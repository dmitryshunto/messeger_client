import React from 'react'

const WelcomePage: React.FC<{message: string}> = ({message}) => {
    return (
        <div>
            {message}
        </div>
    )
}

export default WelcomePage