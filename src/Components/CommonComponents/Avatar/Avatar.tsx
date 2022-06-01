import React from "react"
import { Avatar as AntAvatar } from 'antd';
import { UserOutlined } from '@ant-design/icons';

const Avatar: React.FC<{photoUrl: string | null | undefined}> = ({photoUrl}) => {
    if(photoUrl) return (
        <AntAvatar 
            src = {photoUrl}
        />
    )
    return (
        <AntAvatar 
            icon={<UserOutlined />}
        />
    )
}

export default Avatar