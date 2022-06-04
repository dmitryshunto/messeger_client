import React from 'react'
import { Link } from 'react-router-dom'
import { routes } from '../../../config'
import Avatar from '../../CommonComponents/Avatar/Avatar'

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
                {props.login}
            </Link>
            {/* <Avatar 
                photoUrl={props.photoUrl}
            /> */}
            {props.isOnline ? ' V' : ' X'}
        </div>
    )
}

export default SearchItem