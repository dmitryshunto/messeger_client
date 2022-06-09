import React from 'react'
import css from './OnlineStatus.module.css'
import cn from 'classnames'

type Props = {
    onlineStatus: boolean | undefined
}

const OnlineStatus: React.FC<Props> = ({onlineStatus}) => {
    return (
        <div className={
            cn(css.onlineStatus, { [css.online]: onlineStatus, [css.offline]: !onlineStatus })}
        />
    )
}

export default OnlineStatus
