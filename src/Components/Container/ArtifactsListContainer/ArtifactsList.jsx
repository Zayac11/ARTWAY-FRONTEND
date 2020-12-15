import React from 'react';
import s from './ArtifactsList.module.css'
import ArtifactsListItem from "./ArtifactsListItem/ArtifactsListItem";
import prev from "../../../assets/images/left-chevron.svg";

const ArtifactsList = (props) => {
    return (
        <div className={s.list}>
            <div className={`blueBlur blur`}></div>
            <div className={`orangeBlur blur`}></div>
            <div className={s.top}>
                <button onClick={() => props.history.goBack()} className={s.backBtn}>
                    <img src={prev} alt="back"/>
                </button>
                <div className={s.header}>
                    Данный раздел нужен для демонстрации прототипа
                </div>
                <div></div>
            </div>

            <h2 className={s.title}>Список экспонатов</h2>

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
