import React from 'react';
import { Layout } from 'antd';
import css from './Footer.module.css'
import { APP_NAME } from '../../config';

const { Footer } = Layout

const MyFooter: React.FC = () => {
    return (
        <Footer className={css.footer}>
            {APP_NAME} ©2022 Created by Dmitry Shunto
        </Footer>
    )
}

export default MyFooter