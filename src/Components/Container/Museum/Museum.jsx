import React from 'react';
import s from './Museum.module.css'
import {NavLink} from "react-router-dom";
import ChangeForm from "../../../Common/ChangeForm/ChangeForm";
import MuseumInformation from "../../../Common/MuseumInformation/MuseumInformation";
import artSquare from "../../../assets/images/artsquare.svg";
import information from "../../../assets/images/information-2-copy.svg";
import MuseumCard from "../../../Common/MuseumCard/MuseumCard";
import TransparentButton from "../../../Common/TransparentButton/TransparentButton";

const Museum = (props) => {
    let locations = props.locations
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
                        props.isChanging
                        ?
                            <ChangeForm text={'Изменение данных музея'} {...props} />
                        :
                            <>
                                {/*Пользователь должен видеть информацию о музее*/}
                                <MuseumInformation toggleIsChanging={props.toggleIsChanging}
                                                   name={props.name} isUserMuseumAdmin={props.isUserMuseumAdmin}
                                                   description={props.description} main_img={props.main_img}

                                />
                                {
                                    props.isUserMuseumAdmin && <TransparentButton handleSubmit={props.createLocation} text={'Создать локацию'} />
                                }

                                <div className={'titleContainer'}>
                                    <h2 className={'itemsTitle'}>
                                        Список локаций
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
                                {
                                    locations &&
                                    locations.map(l => {
                                        let last = locations[locations.length - 1].id

                                        return (
                                            <div className={'locationContainer'} key={l.id}>
                                                {
                                                    !props.isUserMuseumAdmin
                                                        ?
                                                        <MuseumCard isCardsChanging={props.isCardsChanging} link={`/locations/${l.id}/halls`} isUserMuseumAdmin={props.isUserMuseumAdmin} prev={l.prev} id={l.id} last={last} name={l.name} swapLocations={props.swapLocations} />
                                                        :
                                                        <MuseumCard isCardsChanging={props.isCardsChanging} link={`/m-admin/${l.id}`} isUserMuseumAdmin={props.isUserMuseumAdmin} prev={l.prev} id={l.id} last={last} name={l.name} swapLocations={props.swapLocations} />
                                                }

                                                {
                                                    props.isRelocate &&
                                                    <div>
                                                        <button className={s.relocateBtn} onClick={() => props.selectLocation(l.id)}>Выбрать локацию для перемещения</button>
                                                    </div>
                                                }
                                            </div>
                                        )
                                    })
                                }
                            </>
                    }




                    {/*<div className={s.createContainer}>*/}
                    {/*    {*/}
                    {/*        props.isUserMuseumAdmin &&*/}
                    {/*        <NavLink className={'create'} to={'/m-admin/create_location'}>*/}
                    {/*            Создать локацию*/}
                    {/*        </NavLink>*/}
                    {/*    }*/}
                    {/*    {*/}
                    {/*        props.isUserMuseumSuperAdmin &&*/}
                    {/*        <NavLink className={'create'} to={'/m-admin/hr-management'}>*/}
                    {/*            Персонал*/}
                    {/*        </NavLink>*/}
                    {/*    }*/}
                    {/*</div>*/}

                </div>
            </div>
        </div>
    );
}

export default Museum;
