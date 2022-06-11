import React from 'react'
import css from './NewMessage.module.css'

type Props = {
    newMessages: number | null
}

const NewMessage: React.FC<Props> = ({newMessages}) => {
    if(!newMessages) return null
    return (
        <div className={css.newMessages}>
            {newMessages}
        </div>
    )
}

export default NewMessage