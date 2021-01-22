import React from 'react';
import s from './MuseumInformation.module.css'

const MuseumInformation = (props) => {
    return (
        <>
            <h2 className={s.name}>{props.name}</h2>
            <div className={s.imgContainer}>
                <img className={s.img} src={props.main_img} alt="section"/>
            </div>
            <div className={s.descriptionTitle}>
                Описание:
            </div>
            <div className={s.description}>
                {props.description}
            </div>
        </>
    );
}

export default MuseumInformation;
