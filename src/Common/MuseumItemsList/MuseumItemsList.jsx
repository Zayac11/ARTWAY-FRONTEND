import React from 'react';
import s from './MuseumItemsList.module.css'
import up from './../../assets/images/up.svg'
import down from './../../assets/images/down.svg'

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

            <div className={s.buttons}>
                {
                    (props.prev !== null && props.isUserMuseumAdmin) &&
                    <button className={`${s.moveBtn} ${s.up}`} onClick={() => props.swapLocations('up', props.id)}>
                        <img src={up} alt="up"/>
                    </button>
                }
                {
                    (props.id !== props.last && props.isUserMuseumAdmin) &&
                    <button className={`${s.moveBtn} ${s.down}`} onClick={() => props.swapLocations('down', props.id)}>
                        <img src={down} alt="down"/>
                    </button>
                }
            </div>

        </div>

    );
}

export default MuseumItemsList;
