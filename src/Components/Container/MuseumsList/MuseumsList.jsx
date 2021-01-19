import React from 'react';
import s from './MuseumsList.module.css'
import {NavLink} from "react-router-dom";

const MuseumsList = (props) => {
    return (
        <div className={s.container}>
            <NavLink to={'/s-admin/create_museum'}>Создать музеич</NavLink>
            {
                props.museums &&
                    props.museums.length > 0 ?
                    props.museums.map(m => {
                        return(
                            <div key={m.id} className={s.museumItemContainer}>
                                <div>
                                    {m.id}
                                </div>
                                <div>
                                    {m.name}
                                </div>
                                <div>
                                    <img src={m.img} alt="museum"/>
                                </div>
                                <div>
                                    {m.description}
                                </div>
                                <NavLink to={`/s-admin/${m.id}`}>Перейти</NavLink>
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
