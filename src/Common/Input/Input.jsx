import React from 'react';
import s from './Input.module.css'

const Input = (props) => {
    return (
        <div className={s.container}>
            <div className={s.text}>
                {props.text}
            </div>
            <input className={s.input} onKeyUp={props.handleFindKey} value={props.value} type={props.type} name={props.name} onFocus={props.handleFocus} onChange={props.handleChange}/>
        </div>
    );
}

export default Input;
