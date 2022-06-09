import React, { useCallback, useMemo } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Layout, Menu } from 'antd'
import {
    LoginOutlined,
    UserAddOutlined,
    MailOutlined,
    SearchOutlined,
    UserDeleteOutlined
} from '@ant-design/icons'
import authSelectors from '../../selectors/auth'
import { routes } from '../../config'
import MenuLabel from './MenuItem/MenuItem'
import type { MenuProps } from 'antd';
import ProfileButton from './ProfileButton/ProfileButton'
import { logout as logoutThunk } from '../../redux/authorizationReducer'
import { AppDispatch } from '../../redux/redux'

type MenuItemType = Required<MenuProps>['items'][number]

const { Sider } = Layout

const getMenuItem = (route: string, children: React.ReactNode, icon?: React.ReactNode, onClick?: () => void): MenuItemType => {
    const label = (
        <MenuLabel
            children={children}
            route={route}
        />
    )
    return { label, key: route, icon, onClick }
}


const unauthorizedUserMenuItems: MenuItemType[] = [
    getMenuItem(routes['login'], 'Login', <LoginOutlined />),
    getMenuItem(routes['registration'], 'Registration', <UserAddOutlined />),
]

const messageMenuItemContent = (newMessagesNumber: number | undefined) => {
    if (newMessagesNumber) return `Messages ${newMessagesNumber}`
    return 'Messages'
}

type Props = {
    collapsed: boolean
}

const MySider: React.FC<Props> = ({collapsed}) => {

    const dispatch: AppDispatch = useDispatch()
    const logout = () => {
        dispatch(logoutThunk())
    } 

    const data = useSelector(authSelectors.data)
    const login = data?.login
    const newMessagesNumber = data?.newMessages.length
    
    const authorizedUserMenuItems: MenuItemType[] = useMemo(() => {
        return [
            getMenuItem(routes['chats'], messageMenuItemContent(newMessagesNumber), <MailOutlined data={`${newMessagesNumber}`} />),
            getMenuItem(routes['search'], 'Search', <SearchOutlined />),
            { label: 'Log out', key: 'Log out', onClick: logout, icon: <UserDeleteOutlined /> }
        ]
    }, [newMessagesNumber])

    const menuItems = login ? authorizedUserMenuItems : unauthorizedUserMenuItems


    return (
        <Sider
            trigger={null} collapsible
            collapsed={collapsed}
            theme='light'
        >
            {login &&
                <ProfileButton
                    collapsed = {collapsed}
                />}
            <Menu
                items={menuItems}
            />
        </Sider>
    )
}

export default MySider