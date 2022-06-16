import React from "react";
import css from './PageNotFound.module.css'

const PageNotFound: React.FC<{ errMessage?: string }> = ({ errMessage }) => {
    return (
        <div
            className={css.errorPage}
        >
            <div
                className = {css.errorMessage}
            >
                {errMessage || 'No data!'}
            </div>
        </div>
    )
}

export default PageNotFound