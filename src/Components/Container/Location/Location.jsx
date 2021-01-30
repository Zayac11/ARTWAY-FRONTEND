import React from 'react';
import s from './Location.module.css'
import {NavLink} from "react-router-dom";
import prev from "../../../assets/images/left-chevron.svg";
import artSquare from "../../../assets/images/artsquare.svg";
import information from "../../../assets/images/information-2-copy.svg";
import MuseumCard from "../../../Common/MuseumCard/MuseumCard";

const Location = (props) => {
    let halls = props.halls
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
                    {/*            </>*/}
                    {/*            :*/}
                    {/*            <ChangeForm text={'Изменение данных локации'} {...props}*/}
                    {/*            />)*/}
                    {/*}*/}

                    {
                        props.isChanging &&
                        <button className={s.deleteBtn} onClick={props.deleteLocation}>Удалить локацию</button>
                    }

                    {
                        props.isUserMuseumAdmin &&
                        <NavLink className={'create'} to={`/m-admin/${props.location_id}/create_halls`}>
                            Создать зал
                        </NavLink>
                    }
                    {
                        props.isUserMuseumAdmin
                        ?
                            <>
                                <div className={'titleContainer'}>
                                    <h2 className={'itemsTitle'}>
                                        Список залов
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
                                        Список залов
                                    </h2>
                                    <button onClick={() => props.history.goBack()} className={'backBtn'}>
                                        <img src={prev} alt="back"/>
                                    </button>
                                </div>
                            </>
                    }


                    {
                        halls &&
                        halls.map(l => {
                            let last = halls[halls.length - 1].id
                            return (
                                <div className={'locationContainer'} key={l.id}>
                                    {
                                        props.isUserMuseumAdmin
                                            ?
                                            <MuseumCard isCardsChanging={props.isCardsChanging} link={`/m-admin/${props.location_id}/${l.id}`} isUserMuseumAdmin={props.isUserMuseumAdmin} prev={l.prev} id={l.id} last={last} name={l.name} locations={props.halls} swapLocations={props.swapHalls} />
                                            :
                                            <MuseumCard isCardsChanging={props.isCardsChanging} link={`/halls/${l.id}/artifacts`} isUserMuseumAdmin={props.isUserMuseumAdmin} prev={l.prev} id={l.id} last={last} name={l.name} />

                                    }
                                    {
                                        props.isRelocate &&
                                        <div>
                                            <button className={s.relocateBtn} onClick={() => props.selectHall(l.id)}>Выбрать зал для перемещения артефакта</button>
                                        </div>
                                    }
                                </div>
                            )
                        })
                    }
                </div>
            </div>
        </div>

    )
}

export default Location;
