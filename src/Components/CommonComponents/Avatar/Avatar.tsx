import React, { useCallback, useState } from "react"
import { Avatar as AntAvatar } from 'antd';
import { UserOutlined } from '@ant-design/icons';
import { AppDispatch } from "../../../redux/redux";
import { useDispatch } from "react-redux";
import { updatePhoto as updatePhotoThunk } from "../../../redux/myProfileReducer";
import AvatarEditor from 'react-avatar-edit'

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
            <button disabled = {!base64PhotoUrl} onClick={updatePhoto}>Update Photo</button>
        </div>
    )
    if (photoUrl) return (
        <div>
            <AntAvatar
                src={photoUrl}
            />
            <button onClick={() => setUpdateMode(true)}>Update Photo</button>
        </div>
    )
    return (
        <div>
            <AntAvatar
                icon={<UserOutlined />}
            />
            <button onClick={() => setUpdateMode(true)}>Update Photo</button>
        </div>
    )
}

export default Avatar