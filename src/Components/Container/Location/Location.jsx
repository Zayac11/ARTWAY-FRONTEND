import React from 'react';
import s from './Location.module.css'
import ChangeForm from "../../../Common/ChangeForm/ChangeForm";
import {NavLink} from "react-router-dom";
import MuseumItemsList from "../../../Common/MuseumItemsList/MuseumItemsList";

const Location = (props) => {
    let halls = props.halls
    return (
        <div className={s.museum}>
            <h1>Локация</h1>
            {
                props.isUserMuseumAdmin && <NavLink to={'/m-admin/print'}>Артефакты для печати</NavLink>
            }
            {
                props.isUserMuseumAdmin &&(
                    !props.isChanging ?
                        <>
                            <button onClick={() => props.toggleIsChanging(true)}>Изменить или удалить</button>
                            <h2 className={s.title}>{props.name}</h2>
                            <img src={props.main_img} alt="location"/>
                            <div className={s.description}>{props.description}</div>
                        </>
                        :
                            <ChangeForm {...props}
                        />)
            }
            {
                props.isChanging &&
                <button onClick={props.deleteLocation}>Удалить локу</button>
            }

            {
                props.isUserMuseumAdmin &&
                <NavLink to={`/m-admin/${props.location_id}/create_halls`}>
                    Создать зал
                </NavLink>
            }

            {
                halls &&
                halls.map(l => {
                    let last = halls[halls.length - 1].id
                    return (
                        <div className={s.locationContainer} key={l.id}>
                            <MuseumItemsList isUserMuseumAdmin={props.isUserMuseumAdmin} prev={l.prev} id={l.id} last={last} img={l.img} name={l.name} description={l.description} locations={props.halls} swapLocations={props.swapHalls} />

                            {
                                props.isUserMuseumAdmin
                                    ? <NavLink to={`/m-admin/${props.location_id}/${l.id}`}>Перейти</NavLink>
                                    : <NavLink to={`/halls/${l.id}/artifacts`}>Перейти к карте артефактов</NavLink>
                            }
                        </div>
                    )
                })
            }
        </div>
    );
}

export default Location;
