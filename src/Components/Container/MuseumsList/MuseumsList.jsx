import React from 'react';
import s from './MuseumsList.module.css'
import {NavLink} from "react-router-dom";
import prev from "../../../assets/images/left-chevron.svg";

const MuseumsList = (props) => {
    return (
        <div className={s.container}>
            <button onClick={() => props.history.goBack()} className={'backBtn'}>
                <img src={prev} alt="back"/>
            </button>
            <NavLink className={'create'} to={'/s-admin/create_museum'}>Создать музей</NavLink>
            {
                props.museums &&
                    props.museums.length > 0 ?
                    props.museums.map(m => {
                        return(
                            <div key={m.id} className={s.museumItemContainer}>
                                <div className={s.id}>
                                    Id: {m.id}
                                </div>
                                <div className={s.name}>
                                    {m.name}
                                </div>
                                <div className={s.img}>
                                    <img src={m.img} alt="museum"/>
                                </div>
                                <div className={s.description}>
                                    <div className={s.descriptionTitle}>
                                        Описание:
                                    </div>
                                    <div>
                                        {m.description}
                                    </div>
                                </div>
                                <NavLink className={s.goInside} to={`/s-admin/${m.id}`}>Перейти</NavLink>
                            </div>
                        )
                    })
                    :
                    <div>
                        Музеев не найдено
                    </div>
            }

        </div>
    );
}

export default MuseumsList;
