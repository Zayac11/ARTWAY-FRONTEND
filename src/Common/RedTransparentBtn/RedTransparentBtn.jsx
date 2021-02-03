import React from 'react';
import s from './RedTransparentBtn.module.css'
import {NavLink} from "react-router-dom";

const RedTransparentBtn = (props) => {
    return (
        <>
            {
                props.link
                ?
                    <NavLink className={s.button} to={`${props.link}`}>
                        {props.text}
                    </NavLink>
                :
                    <button onClick={props.handleSubmit} className={s.button}>
                        {props.text}
                    </button>
            }
        </>

    );
}

export default RedTransparentBtn;
