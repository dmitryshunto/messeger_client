import React, { useCallback, useState } from "react"
import { Avatar as AntAvatar, Button } from 'antd';
import { DownloadOutlined, UserOutlined } from '@ant-design/icons';
import { AppDispatch } from "../../../redux/redux";
import { useDispatch } from "react-redux";
import { updatePhoto as updatePhotoThunk } from "../../../redux/myProfileReducer";
import AvatarEditor from 'react-avatar-edit'
import css from './Avatar.module.css'

const Avatar: React.FC<{ photoUrl: string | null | undefined }> = ({ photoUrl }) => {
    const [updateMode, setUpdateMode] = useState(false)
    const [base64PhotoUrl, setBase64PhotoUrl] = useState('')
    const dispatch: AppDispatch = useDispatch()

    const updatePhoto = useCallback(() => {
        dispatch(updatePhotoThunk(base64PhotoUrl))
        setUpdateMode(false)
    }, [dispatch, base64PhotoUrl])

    if (updateMode) return (
        <div>
            <AvatarEditor
                onCrop={(base64PhotoUrl: string) => setBase64PhotoUrl(base64PhotoUrl)}
                width={300}
                height={300}
            />
            <UpdatePhotoBtn 
                cb = {updatePhoto}
                disabled = {!base64PhotoUrl}
            />
        </div>
    )

    return (
        <div
            className = {css.avatar}
        >
            <AntAvatar
                size={100}
                src={photoUrl}
                icon={<UserOutlined />}
            />
            <UpdatePhotoBtn 
                cb = {() => setUpdateMode(true)}
            />
        </div>
    )
}

type Props = {
    cb: () => void
    disabled?: boolean
}

const UpdatePhotoBtn: React.FC<Props> = (props) => {
    return (
        <Button
            disabled = {props.disabled}
            onClick={props.cb}
            type="primary" 
            shape="circle" 
            icon={<DownloadOutlined />}
            size = "small"
        />
    )
}

export default Avatar