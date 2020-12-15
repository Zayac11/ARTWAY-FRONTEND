import React from 'react';
import s from './ArtifactsListItem.module.css'
import {NavLink} from "react-router-dom";

const ArtifactsListItem = ({data, ...props}) => {
    return (
        <div className={s.item}>
            <div className={s.name}>
                {data.name}
            </div>
            <div className={s.imgContainer}>
                <img src={data.img} alt="artifact"/>
            </div>
            <div className={s.id}>
                {data.id}
            </div>
            <NavLink to={`/artifact/${data.id}`}>
                Перейти к экспонату
            </NavLink>
            <NavLink to={`/artifact/${data.id}/qr-code`}>
                Открыть qr код
            </NavLink>
        </div>
    );
}

export default ArtifactsListItem;
