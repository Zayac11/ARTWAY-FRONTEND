import React from 'react';
import s from './BlueButton.module.css'

const BlueButton = (props) => {
    return (
        <>
            <button onClick={props.handleSubmit} className={s.button}>
                {props.text}
            </button>
        </>

    );
}

export default BlueButton;
