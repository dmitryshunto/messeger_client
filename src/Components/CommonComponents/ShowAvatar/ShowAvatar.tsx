import { UserOutlined } from '@ant-design/icons'
import { Avatar } from 'antd'
import React from 'react'

type Props = {
    src?: string | null
}

const ShowAvatar: React.FC<Props> = ({ src }) => {
    return (
        <Avatar
            src={src}
            icon={<UserOutlined />}
        />
    )
}

export default ShowAvatar