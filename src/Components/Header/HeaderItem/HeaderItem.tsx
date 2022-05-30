import React from 'react'
import { Link } from 'react-router-dom'

type Props = {
    route: string
    children: React.ReactNode
}

const HeaderItem: React.FC<Props> = (props) => {
    return (
        <div>
            <Link to = {props.route}>
                {props.children}
            </Link>
        </div>
    )
}

export default HeaderItem