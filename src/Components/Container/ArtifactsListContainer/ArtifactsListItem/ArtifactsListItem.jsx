import React from 'react';
import s from './ArtifactsListItem.module.css'
import TransparentButton from "../../../../Common/TransparentButton/TransparentButton";
import BlackButton from "../../../../Common/BlackButton/BlackButton";

const ArtifactsListItem = ({data, ...props}) => {
    return (
        <div className={s.item}>
            <div className={s.name}>
                {data.name}
            </div>
            <div className={s.imgContainer}>
                <div className={s.id}>
                    ID: {data.id}
                </div>
                <img src={data.img} alt="artifact"/>
            </div>
            <TransparentButton link={`/artifacts/${data.id}`} text={'Перейти к экспонату'} />
            <BlackButton link={`/artifacts/${data.id}/qr-code`} text={'Открыть qr код'} />
        </div>
    );
}

export default ArtifactsListItem;
