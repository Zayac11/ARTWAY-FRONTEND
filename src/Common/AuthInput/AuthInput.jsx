import React from 'react';
import s from './AuthInput.module.css'

const AuthInput = (props) => {
    return (
        <div className={s.container}>
            <div className={s.inputContainer}>
                <img src={props.img} alt="input type icon"/>
                <input placeholder={props.placeholder} className={s.input} onKeyUp={props.handleFindKey} value={props.value} type={props.type} name={props.name} onFocus={props.handleFocus} onChange={props.handleChange}/>
            </div>
        </div>
    );
}

export default AuthInput;
