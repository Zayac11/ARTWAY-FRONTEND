import React from 'react';
import s from './MuseumItemsList.module.css'

const MuseumItemsList = (props) => {

    return (
        <div className={s.location}>
            <h3 className={s.title}>
                {props.name}
            </h3>
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
        </div>

    );
}

export default MuseumItemsList;
