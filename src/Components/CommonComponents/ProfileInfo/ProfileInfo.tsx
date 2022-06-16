import css from './ProfileInfo.module.css'
import React from 'react';

type Props = {
    [key: string]: string
    email: string
    firstName: string
    lastName: string
}

const ProfileInfo: React.FC<Props> = (props) => {
    return (
        <div
            className = {css.profileInfo}
        >
            <div
                className = {css.header}
            >
                Personal info
            </div>
            <ProfileInfoItem 
                label='email'
                value={props.email}
            />
            <ProfileInfoItem 
                label='name'
                value={`${props.firstName} ${props.lastName}`}
            />
        </div>
    );
}

type ItemProps = {
    label: string
    value: string
}

const ProfileInfoItem: React.FC<ItemProps> = (props) => {
    return (
        <div
            className = {css.profileInfoItem}
        >
            <div>{props.label.toLocaleLowerCase()}:</div>
            <div>{props.value}</div>            
        </div>
    );
}
export default ProfileInfo