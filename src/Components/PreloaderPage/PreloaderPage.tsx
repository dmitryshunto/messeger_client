import { Loading3QuartersOutlined } from '@ant-design/icons'
import React from 'react'
import css from './Preloader.module.css'
import cn from 'classnames'

type Props = {
    fullPage?: boolean
}

const PreloaderPage: React.FC<Props> = (props) => {    
    return (
        <div
            className = {cn(css.preloaderPage,
                            {[css.fullPage]: props.fullPage})}
        >
            <Loading3QuartersOutlined
                style={{ fontSize: '300%'}}
                spin  
            />
        </div>
    )
}

export default PreloaderPage