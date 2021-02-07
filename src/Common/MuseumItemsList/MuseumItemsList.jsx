import React from 'react';
import s from './MuseumItemsList.module.css'

const MuseumItemsList = (props) => {

    return (
        <div className={s.location}>
            <h3 className={s.title}>
                {props.name}
            </h3>
            <div className={s.imgContainer}>
                <img className={s.img} src={props.img} alt="location"/>
            </div>
            <div className={s.descriptionContainer}>
                <h4 className={s.descriptionTitle}>
                    Описание
                </h4>
                <div className={s.description}>
                    {props.description}
                </div>
            </div>

        </div>

    );
}

export default MuseumItemsList;
