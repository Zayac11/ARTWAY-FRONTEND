import React from 'react';
import s from './PrintItem.module.css'

const PrintItem = (props) => {
    return (
        <div className={s.printItem}>
            <div className={s.imgContainer}>
                <img className={s.img} src={props.img} alt="location"/>
            </div>
            <div className={s.info}>
                <div className={s.title}>
                    Название: {props.name}
                </div>
                <div className={s.id}>
                    ID: {props.id}
                </div>

                <button className={s.button} onClick={() => props.deleteOneArtifact(props.id)}>Удалить из печати</button>
            </div>
        </div>
    );
}

export default PrintItem;
