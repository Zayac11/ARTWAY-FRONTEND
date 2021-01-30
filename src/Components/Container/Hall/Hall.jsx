import React from 'react';
import s from './Hall.module.css'
import MuseumItemsList from "../../../Common/MuseumItemsList/MuseumItemsList";
import {NavLink} from "react-router-dom";
import prev from "../../../assets/images/left-chevron.svg";
import artSquare from "../../../assets/images/artsquare.svg";
import information from "../../../assets/images/information-2-copy.svg";
import MuseumCard from "../../../Common/MuseumCard/MuseumCard";

const Hall = (props) => {
    let artifacts = props.artifacts
    return (
        <div className={'outer'}>
            <div className={'container'}>
                <div className={'museum'}>
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
                        props.isUserMuseumAdmin && <NavLink className={'create'} to={'/m-admin/print'}>Артефакты для печати</NavLink>
                    }
                    {/*{*/}
                    {/*    props.isUserMuseumAdmin &&(*/}
                    {/*        !props.isChanging ?*/}
                    {/*            <>*/}
                    {/*                <button className={s.change} onClick={() => props.toggleIsChanging(true)}>Изменить или удалить</button>*/}
                    {/*                <MuseumInformation name={props.name} description={props.description} main_img={props.main_img} />*/}
                    {/*            </>*/}
                    {/*            :*/}
                    {/*            <ChangeForm text={'Изменение зала'} {...props} />)*/}
                    {/*}*/}
                    {
                        props.isChanging &&
                        <button className={s.deleteBtn} onClick={props.deleteHall}>Удалить зал</button>
                    }
                    {
                        props.isUserMuseumAdmin &&
                        <NavLink className={'create'} to={`/m-admin/${props.location_id}/${props.hall_id}/create_artifacts`}>
                            Создать экспонат
                        </NavLink>
                    }
                    {
                        props.isUserMuseumAdmin
                            ?
                            <>
                                <div className={'titleContainer'}>
                                    <h2 className={'itemsTitle'}>
                                        Список экспонатов
                                    </h2>
                                    {
                                        props.isUserMuseumAdmin &&(
                                            props.isCardsChanging
                                                ?
                                                <button onClick={() => {props.toggleIsCardsChanging(false)}} className={'cards_changing_button'}>
                                                    Сохранить
                                                </button>
                                                :
                                                <button onClick={() => props.toggleIsCardsChanging(true)} className={'cards_changing_button'}>
                                                    Изменить порядок
                                                </button>)
                                    }
                                </div>
                            </>
                            :
                            <>
                                <div className={'userTitleContainer'}>
                                    <h2 className={'itemsTitle'}>
                                        Список экспонатов
                                    </h2>
                                    <button onClick={() => props.history.goBack()} className={'backBtn'}>
                                        <img src={prev} alt="back"/>
                                    </button>
                                </div>
                            </>
                    }

                    {
                        artifacts &&
                        artifacts.map(l => {
                            let last = artifacts[artifacts.length - 1].id
                            return (
                                <div className={'locationContainer'} key={l.id}>
                                    {
                                        !props.isUserMuseumAdmin
                                            ?
                                            <NavLink to={`/artifacts/${l.id}`}>
                                                <MuseumItemsList isUserMuseumAdmin={props.isUserMuseumAdmin} prev={l.prev} id={l.id} last={last} img={l.img} name={l.name} description={l.description} locations={props.halls} swapLocations={props.swapArtifacts} />
                                            </NavLink>
                                            :
                                            <MuseumCard isCardsChanging={props.isCardsChanging} link={`/m-admin/${props.location_id}/${props.hall_id}/${l.id}`} isUserMuseumAdmin={props.isUserMuseumAdmin} prev={l.prev} id={l.id} last={last} name={l.name} swapLocations={props.swapArtifacts} />
                                    }

                                    { //Находится ли данный товар в корзине
                                        props.isUserMuseumAdmin && (
                                            props.print.some(item => item.id === l.id) ?
                                                <button className={s.inCart} onClick={() => props.deleteOneArtifact(l.id)}>
                                                    Удалить из печати
                                                </button>

                                                :   <button className={s.inCart} onClick={() => props.addArtifactToPrint(l)}
                                                >
                                                    Добавить к печати
                                                </button>)
                                    }

                                    {
                                        props.isUserMuseumAdmin &&
                                        <NavLink className={s.goInside} to={`/m-admin/relocate/${props.location_id}/${props.hall_id}/${l.id}`}>Переместить экспонат</NavLink>
                                    }

                                </div>
                            )
                        })
                    }
                </div>
            </div>
        </div>
    );
}

export default Hall;
