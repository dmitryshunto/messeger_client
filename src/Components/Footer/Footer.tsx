import React from 'react';
import { Layout } from 'antd';
import css from './Footer.module.css'

const { Footer } = Layout

const MyFooter: React.FC = () => {
    return (
        <Footer className={css.footer}>
            Thomas Messenger ©2022 Created by Dmitry Shunto
        </Footer>
    )
}

export default MyFooter