import { UserOutlined } from '@ant-design/icons'
import { Avatar } from 'antd'
import React from 'react'
import OnlineStatus from '../OnlineStatus/OnlineStatus'
import css from './ShowAvatar.module.css'

type Props = {
    src?: string | null
    size?: 'large' | 'small' | 'default' | number
    onlineStatus: boolean
}

const ShowAvatar: React.FC<Props> = ({ src, size, onlineStatus }) => {
    return (
        <div className={css.avatar}>
            <Avatar
                src={src}
                icon={<UserOutlined />}
                size={size}
            />
            <OnlineStatus
                onlineStatus={onlineStatus}
            />
        </div>
    )
}

export default ShowAvatar