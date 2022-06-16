import React from 'react' 
import { Layout, Button } from 'antd'
import { MenuUnfoldOutlined, MenuFoldOutlined } from '@ant-design/icons'
import css from './Header.module.css'
import { APP_NAME } from '../../config'
import appIcon from '../../Images/icon.jpg'

const { Header } = Layout

type Props = {
    collapsed: boolean
    setCollapsed: (collapsed: boolean) => void
}

const MyHeader: React.FC<Props> = ({collapsed, setCollapsed}) => {
    return (
        <Header className = {css.header}>
            <Button 
                className = {css.collapseBtn}
                onClick={() => setCollapsed(!collapsed)} 
                size = 'small'
            >
                {collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
            </Button>
            <div className = {css.appName}>
                <img
                    width = {24}
                    height = {24} 
                    src = {appIcon}
                />
                <div>
                    {APP_NAME}
                </div>
            </div>
        </Header>
    )
}

export default MyHeader