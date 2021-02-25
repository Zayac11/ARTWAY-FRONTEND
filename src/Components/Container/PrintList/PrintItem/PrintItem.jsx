import React from 'react';
import s from './PrintItem.module.css'

const PrintItem = (props) => {
    return (
        <div className={s.printItem}>
            <div className={s.imgContainer}>

                {
                    props.img_1 !== null
                        ?
                        <img className={s.img} src={props.img_1} alt="location"/>
                        : props.img_2 !== null
                            ? <img className={s.img} src={props.img_2} alt="location"/>
                            : props.img_3 !== null
                                ? <img className={s.img} src={props.img_3} alt="location"/>
                                : props.img_4 !== null
                                    ? <img className={s.img} src={props.img_4} alt="location"/>
                                    : props.img_5 !== null
                                        ? <img className={s.img} src={props.img_5} alt="location"/>
                                        :
                                        <div className={s.noImg}>

                                        </div>
                }

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
