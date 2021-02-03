import React from 'react';
import s from './TransparentButton.module.css'
import {NavLink} from "react-router-dom";

const TransparentButton = (props) => {
    return (
        <>

            {
                props.type === 'link' &&
                <NavLink to={props.link} className={s.button}>
                    {props.text}
                </NavLink>
            }
            {
                props.type === 'btn' &&
                <button onClick={props.handleSubmit} className={s.button}>
                    {props.text}
                </button>
            }
            {
                props.type === 'withProps' &&
                <button onClick={() => props.handleSubmit(props.data)} className={s.button}>
                    {props.text}
                </button>
            }

        </>

    );
}

export default TransparentButton;
