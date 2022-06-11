import { UserOutlined } from '@ant-design/icons'
import { Avatar } from 'antd'
import React from 'react'

type Props = {
    src?: string | null
    size?: 'large' | 'small' | 'default' | number
}

const ShowAvatar: React.FC<Props> = ({ src, size }) => {
    return (
        <Avatar
            src={src}
            icon={<UserOutlined />}
            size={size}
        />
    )
}

export default ShowAvatar