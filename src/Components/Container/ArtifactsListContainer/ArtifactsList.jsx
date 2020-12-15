import React from 'react';
import s from './ArtifactsList.module.css'
import ArtifactsListItem from "./ArtifactsListItem/ArtifactsListItem";

const ArtifactsList = (props) => {
    return (
        <div className={s.list}>
            <button onClick={() => {props.history.goBack()}} className={s.backBtn}>
                Кнопка назад
            </button>
            <div className={s.itemsContainer}>
                {props.artifactsList.map(l => (
                    <ArtifactsListItem key={l.id}
                                       data={l} />
                ))}
            </div>
        </div>
    );
}

export default ArtifactsList;
