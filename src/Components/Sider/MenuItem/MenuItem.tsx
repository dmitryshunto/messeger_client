import React from 'react'
import { Link } from 'react-router-dom'


export type MenuItemType = {
    route: string,
    children: React.ReactNode,
}

const MenuLabel: React.FC<MenuItemType> = (props) => {
    return (
        <Link to={props.route}>
            {props.children}
        </Link>
    )
}

export default MenuLabel