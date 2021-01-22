import React from 'react';
import s from './Location.module.css'
import ChangeForm from "../../../Common/ChangeForm/ChangeForm";
import {NavLink} from "react-router-dom";
import MuseumItemsList from "../../../Common/MuseumItemsList/MuseumItemsList";
import MuseumInformation from "../../../Common/MuseumInformation/MuseumInformation";

const Location = (props) => {
    let halls = props.halls
    return (
        <div className={s.museum}>
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
            <h3 className={s.itemsTitle}>
                Список залов локации
            </h3>
            {
                halls &&
                halls.map(l => {
                    let last = halls[halls.length - 1].id
                    return (
                        <div className={s.locationContainer} key={l.id}>
                            <MuseumItemsList isUserMuseumAdmin={props.isUserMuseumAdmin} prev={l.prev} id={l.id} last={last} img={l.img} name={l.name} description={l.description} locations={props.halls} swapLocations={props.swapHalls} />

                            {
                                props.isUserMuseumAdmin
                                    ? <NavLink className={s.goInside} to={`/m-admin/${props.location_id}/${l.id}`}>Перейти к залу</NavLink>
                                    : <NavLink className={s.goInside} to={`/halls/${l.id}/artifacts`}>Перейти к залу</NavLink>
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
    );
}

export default Location;
