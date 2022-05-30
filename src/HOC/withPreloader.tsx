import React from 'react'
import { useSelector } from 'react-redux';
import PreloaderPage from '../Components/PreloaderPage/PreloaderPage';
import { DataSelector } from '../types/common'

export const withPreloader = function<Props>(Component: React.FC, selector: DataSelector<boolean>) {
    const NewComponent: React.FC<Props> = (props) => {
        if(useSelector(selector)) return <PreloaderPage />
        return (
            <Component {...props} />
        )
    }
    return NewComponent
}