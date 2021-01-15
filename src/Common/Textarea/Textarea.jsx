import React from 'react';
import s from './Textarea.module.css'

const Textarea = (props) => {
    return (
        <div className={s.container}>
            <div className={s.text}>
                {props.text}
            </div>
            <textarea className={s.input} onKeyUp={props.handleFindKey} value={props.value} name={props.name} onFocus={props.handleFocus} onChange={props.handleChange}/>
        </div>
    );
}

export default Textarea;
