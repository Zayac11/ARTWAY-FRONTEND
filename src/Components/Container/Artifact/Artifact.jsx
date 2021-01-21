import React from 'react';
import s from './Artifact.module.css'
import prev from './../../../assets/images/next.svg'
import Audio from "../../../Common/Audio/Audio";
import ChangeForm from "../../../Common/ChangeForm/ChangeForm";
import {NavLink} from "react-router-dom";

const Artifact = (props) => {
    return (
        <>
            <h1>Артефакт</h1>
            {
                props.isUserMuseumAdmin && <NavLink to={'/m-admin/print'}>Артефакты для печати</NavLink>
            }
            {
                props.isUserMuseumAdmin &&(
                (props.isChanging) ?
                    <ChangeForm {...props}
                                isItemArtifact={true} //Является ли создаваемы объект артефактом
                    />
                    :
                    <>
                        <button onClick={() => props.toggleIsChanging(true)}>Изменить или удалить</button>
                    </>)
            }

            {
                props.isChanging &&
                <button onClick={props.deleteArtifact}>Удалить артефакт</button>
            }
            <div className={s.artifactContainer}>
                <div className='blackTop'>
                    <div className={s.top}>
                        <button onClick={() => props.history.goBack()} className={s.backBtn}>
                            <img src={prev} alt="back"/>
                        </button>
                        <div className={s.name}>
                            {props.name}
                        </div>
                        <div></div>
                    </div>
                </div>
                <div className={s.artifact}>
                    <div className={s.imgContainer}>
                        <img src={props.main_img} alt="artifact"/>
                    </div>

                    <div className={s.info}>
                        <div className={s.title}>
                            Аудиогид
                        </div>
                        <Audio audio={props.main_audio} />

                        <div className={s.descriptionContainer}>
                            <div className={s.title}>
                                Описание
                            </div>
                            <div className={s.description}>
                                {props.description}
                            </div>
                        </div>
                        {
                            props.video !== '' &&
                                <div>
                                    <div className={s.title}>
                                        Видео
                                    </div>
                                    <div>
                                        <a href={props.video} target={'_blank'} rel="noreferrer noopener">Открыть</a>
                                    </div>
                                </div>
                        }
                    </div>
                </div>
            </div>
        </>

    );
}

export default Artifact;
