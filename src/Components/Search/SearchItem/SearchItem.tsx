import React from 'react'
import { Link } from 'react-router-dom'
import { routes } from '../../../config'
import { UIUserData } from '../../../types/users'

type Props = {
    isOnline: boolean
    id: number
    login: string
}

const SearchItem: React.FC<Props> = (props) => {
    return (
        <div>
            <Link to = {`${routes['profile']}${props.id}`}>
                {props.login}
            </Link>
            {props.isOnline ? ' V' : ' X'}
        </div>
    )
}

export default SearchItem