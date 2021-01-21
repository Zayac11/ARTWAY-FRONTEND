import React from 'react';
import s from './Museum.module.css'
import {NavLink} from "react-router-dom";
import ChangeForm from "../../../Common/ChangeForm/ChangeForm";
import MuseumItemsList from "../../../Common/MuseumItemsList/MuseumItemsList";

const Museum = (props) => {

    let locations = props.locations
    return (
        <div className={s.museum}>
            <h1>Музей</h1>
            {
                props.isUserMuseumAdmin && <NavLink to={'/m-admin/print'}>Артефакты для печати</NavLink>
            }

            {
                props.isUserMuseumAdmin && (
                    !props.isChanging ?
                        <>
                            <button onClick={() => props.toggleIsChanging(true)}>Изменить</button>
                            <h2 className={s.title}>{props.name}</h2>
                            <img src={props.main_img} alt="museum"/>
                            <div className={s.description}>{props.description}</div>
                        </>
                        :
                        <>
                            <ChangeForm {...props} />
                        </>)

            }

            {
                props.isUserMuseumAdmin &&
                <NavLink to={'/m-admin/create_location'}>
                    Создать локу
                </NavLink>
            }
            {
                props.isUserMuseumSuperAdmin &&
                <NavLink to={'/m-admin/hr-management'}>
                    Персонал
                </NavLink>
            }

            {
                locations &&
                locations.map(l => {
                    let last =locations[locations.length - 1].id
                    return (
                        <div className={s.locationContainer} key={l.id}>
                            <MuseumItemsList isUserMuseumAdmin={props.isUserMuseumAdmin} prev={l.prev} id={l.id} last={last} img={l.img} name={l.name} description={l.description} swapLocations={props.swapLocations} />
                            {
                                props.isUserMuseumAdmin
                                ? <NavLink to={`/m-admin/${l.id}`}>Перейти</NavLink>
                                : <NavLink to={`/locations/${l.id}/halls`}>Перейти к карте локаций</NavLink>
                            }


                        </div>
                    )
                })
            }
        </div>
    );
}

export default Museum;
