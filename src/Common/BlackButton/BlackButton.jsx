import React from 'react';
import s from './BlackButton.module.css'
import {NavLink} from "react-router-dom";

const BlackButton = (props) => {
    return (
        <>
            {
                props.artifactId !== "" ?
                    <NavLink  className={s.button} to={`${props.link}`}>
                        {props.text}
                    </NavLink>
                    :
                    <div className={s.button}>
                        {props.text}
                    </div>
            }
        </>

    );
}

export default BlackButton;
