import React from 'react';
import s from './BlackButton.module.css'
import {NavLink} from "react-router-dom";

const BlackButton = (props) => {
    return (
        <NavLink className={s.button} to={`${props.link}`}>
            {props.text}
        </NavLink>
    );
}

export default BlackButton;
