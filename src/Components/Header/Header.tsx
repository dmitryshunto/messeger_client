import React from 'react' 
import { Layout, Menu, Breadcrumb, Button } from 'antd';
import { MenuUnfoldOutlined, MenuFoldOutlined } from '@ant-design/icons';

const { Header, Content, Footer } = Layout

type Props = {
    collapsed: boolean
    setCollapsed: (collapsed: boolean) => void
}

const MyHeader: React.FC<Props> = ({collapsed, setCollapsed}) => {
    return (
        <Header>
            <Button type="primary" onClick={() => setCollapsed(!collapsed)} >
                {collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
            </Button>
            
        </Header>
    )
}

export default MyHeader