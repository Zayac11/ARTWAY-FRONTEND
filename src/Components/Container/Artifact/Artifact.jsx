import React from 'react';
import s from './Artifact.module.css'
import prev from './../../../assets/images/next.svg'
import Audio from "../../../Common/Audio/Audio";
import ChangeForm from "../../../Common/ChangeForm/ChangeForm";
import {NavLink} from "react-router-dom";
import artSquare from "../../../assets/images/artsquare.svg";
import information from "../../../assets/images/information-2-copy.svg";
import play from "../../../assets/images/play.svg";

const Artifact = (props) => {
    return (
        <div className={'outer'}>
            <div className={'container'}>
                <div className={'artContainer'}>
                    <div className={'artSquare'}>
                        <img className={'artImg'} src={artSquare} alt="artSquare"/>
                        <span>art</span>
                        <span className={'way'}>way</span>
                    </div>
                    <NavLink to={'/'} className={'information'}>
                        <img src={information} alt="information"/>
                    </NavLink>
                </div>

                {
                    props.isUserMuseumAdmin &&
                    <NavLink className={'create'} to={'/m-admin/print'}>Артефакты для печати</NavLink>
                }
                {
                    props.isUserMuseumAdmin && (
                        (props.isChanging) ?
                            <ChangeForm {...props}
                                        isItemArtifact={true} //Является ли создаваемы объект артефактом
                            />
                            :
                            <>
                                <button className={s.change} onClick={() => props.toggleIsChanging(true)}>Изменить или
                                    удалить
                                </button>
                            </>)
                }

                {
                    props.isChanging &&
                    <button className={s.deleteBtn} onClick={props.deleteArtifact}>Удалить артефакт</button>
                }

                <div className={s.name}>
                    {props.name}
                </div>

                <div className={s.artifactContainer}>

                    <div className={s.artifact}>
                        <div className={s.imgContainer}>
                            <img src={props.main_img} alt="artifact"/>
                        </div>

                        <div className={s.info}>
                            <div className={s.title}>
                                Аудиогид
                            </div>
                            <Audio audio={props.main_audio}/>

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
                                    <a href={props.video} target={'_blank'} rel={"noreferrer noopener"} className={s.button}>
                                        <div>
                                            Смотреть видео
                                        </div>
                                        <img src={play} alt="link"/>
                                    </a>
                                </div>
                            }
                        </div>
                    </div>
                </div>
            </div>
        </div>

    );
}

export default Artifact;

{/*<button onClick={() => props.history.goBack()} className={'backBtn'}>*/}
{/*    <img src={prev} alt="back"/>*/}
{/*</button>*/}
