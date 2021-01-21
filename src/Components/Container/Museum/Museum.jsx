import React from 'react';
import s from './Museum.module.css'
import {NavLink} from "react-router-dom";
import ChangeForm from "../../../Common/ChangeForm/ChangeForm";
import MuseumItemsList from "../../../Common/MuseumItemsList/MuseumItemsList";

const Museum = (props) => {
    return (
        <div className={s.museum}>
            <h1>Музей</h1>
            {
                props.isUserMuseumAdmin && <NavLink to={'/m-admin/print'}>Артефакты для печати</NavLink>
            }

            {
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
                    </>

            }

            <NavLink to={'/m-admin/create_location'}>
                Создать локу
            </NavLink>
            <NavLink to={'/m-admin/hr-management'}>
                Персонал
            </NavLink>

            {
                props.locations &&
                props.locations.map(l => {
                    let last = props.locations[props.locations.length - 1].id
                    return (
                        <div className={s.locationContainer} key={l.id}>
                            <MuseumItemsList prev={l.prev} id={l.id} last={last} img={l.img} name={l.name} description={l.description} swapLocations={props.swapLocations} />
                            <NavLink to={`/m-admin/${l.id}`}>Перейти</NavLink>
                        </div>
                    )
                })
            }
        </div>
    );
}

export default Museum;
