import React from "react"
import UserLink from './../../../CommonComponents/UserLink/UserLink';

type Props = {
    id: number
    login: string
    photoUrl: string | null | undefined
}

const CompanionBar: React.FC<Props> = (props) => {
    return (
        <UserLink
            avatarSize={48}
            id = {props.id}
            login = {props.login}
            photoUrl = {props.photoUrl}
        />
    )
}

export default CompanionBar