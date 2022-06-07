import React from 'react'
import { Link } from 'react-router-dom'
import { routes } from '../../../config'
import { Avatar } from 'antd';

type Props = {
    isOnline: boolean
    id: number
    login: string
    photoUrl: string | null
}

const SearchItem: React.FC<Props> = (props) => {
    return (
        <div>
            <Link to = {`${routes['profile']}${props.id}`}>
            <Avatar 
                src = {props.photoUrl}
                // icon = {}    
                />
                {props.login}
            </Link>
            {props.isOnline ? ' V' : ' X'}
        </div>
    )
}

export default SearchItem