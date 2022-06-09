import { SearchOutlined } from '@ant-design/icons'
import { Input } from 'antd'
import React, { useState } from 'react'
import css from '../SearchPage.module.css'

type Props = {
    callback: (str: string) => void
}

const SearchInput: React.FC<Props> = (props) => {
    const [value, setValue] = useState('')
    return (
        <div
            className={css.searchInptut}
        >
            <Input
                type='text'
                value={value}
                placeholder="Search"
                prefix={<SearchOutlined />}
                onChange={(e) => {
                    setValue(e.currentTarget.value)
                    props.callback(e.currentTarget.value)
                }}
            />
        </div>
    )
}

export default SearchInput