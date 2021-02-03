import React from 'react';
import s from './Museum.module.css'
import ChangeForm from "../../../Common/ChangeForm/ChangeForm";
import MuseumInformation from "../../../Common/MuseumInformation/MuseumInformation";
import MuseumCard from "../../../Common/MuseumCard/MuseumCard";
import TransparentButton from "../../../Common/TransparentButton/TransparentButton";
import TopContainer from "../../../Common/Top/TopContainer";
import SuperAdminSlick from "../../../Common/SuperAdminSlick/SuperAdminSlick";

const Museum = (props) => {
    let locations = props.locations
    return (
        <div className={'outer'}>
            <div className={'container'}>
                <div className={'museum'}>

                    <TopContainer isUserMuseumAdmin={props.isUserMuseumAdmin} />

                    {
                        props.isUserMuseumSuperAdmin &&
                            <SuperAdminSlick />
                    }

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
                                    props.isUserMuseumAdmin && <TransparentButton type={'btn'} handleSubmit={props.createLocation} text={'Создать новую локацию'} />
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
