import React from 'react';
import s from './Location.module.css'
import ChangeForm from "../../../Common/ChangeForm/ChangeForm";
import {NavLink} from "react-router-dom";
import MuseumItemsList from "../../../Common/MuseumItemsList/MuseumItemsList";
import MuseumInformation from "../../../Common/MuseumInformation/MuseumInformation";
import prev from "../../../assets/images/left-chevron.svg";
import artSquare from "../../../assets/images/artsquare.svg";
import information from "../../../assets/images/information-2-copy.svg";

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
                    {
                        props.isUserMuseumAdmin &&(
                            !props.isChanging ?
                                <>
                                    <button className={s.change} onClick={() => props.toggleIsChanging(true)}>Изменить или удалить</button>

                                    <MuseumInformation name={props.name} description={props.description} main_img={props.main_img} />
                                </>
                                :
                                <ChangeForm text={'Изменение данных локации'} {...props}
                                />)
                    }
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
                    <div className={'titleContainer'}>
                        <h2 className={'itemsTitle'}>
                            Список залов
                        </h2>
                        <button onClick={() => props.history.goBack()} className={'backBtn'}>
                            <img src={prev} alt="back"/>
                        </button>
                    </div>
                    {
                        halls &&
                        halls.map(l => {
                            let last = halls[halls.length - 1].id
                            return (
                                <div className={'locationContainer'} key={l.id}>
                                    {
                                        !props.isUserMuseumAdmin
                                            ?
                                            <NavLink to={`/halls/${l.id}/artifacts`}>
                                                <MuseumItemsList isUserMuseumAdmin={props.isUserMuseumAdmin} prev={l.prev} id={l.id} last={last} img={l.img} name={l.name} description={l.description} locations={props.halls} swapLocations={props.swapHalls} />
                                            </NavLink>
                                            :
                                            <>
                                                <MuseumItemsList isUserMuseumAdmin={props.isUserMuseumAdmin} prev={l.prev} id={l.id} last={last} img={l.img} name={l.name} description={l.description} swapLocations={props.swapLocations} />
                                                <NavLink className={s.goInside} to={`/halls/${l.id}/artifacts`}>Перейти к залу</NavLink>

                                            </>

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
