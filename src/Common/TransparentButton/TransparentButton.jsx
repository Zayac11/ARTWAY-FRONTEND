import React from 'react';
import s from './TransparentButton.module.css'
import {NavLink} from "react-router-dom";

const TransparentButton = (props) => {
    return (
        <NavLink className={s.button} to={`${props.link}`}>
            {props.text}
        </NavLink>
    );
}

export default TransparentButton;
