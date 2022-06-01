import React from 'react'
import Avatar from 'react-avatar-edit'
import avatarImage from '../../../Images/defaultAvatar.png'

type Props = {
    imageSrc?: string
    onCrop: (data: string) => void
}

const AvatarEditor: React.FC<Props> = (props) => {
    return (
        <Avatar
            src={props.imageSrc}
            onCrop = {props.onCrop} 
            width={300}
            height={300}
        />
    )
}

export default AvatarEditor