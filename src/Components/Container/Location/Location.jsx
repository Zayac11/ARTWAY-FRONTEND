import React from 'react';
import s from './Location.module.css'

import ChangeForm from "../../../Common/ChangeForm/ChangeForm";
import {NavLink} from "react-router-dom";
import MuseumItemsList from "../../../Common/MuseumItemsList/MuseumItemsList";

const Location = (props) => {
    return (
        <div className={s.museum}>
            <h1>Локация</h1>
            {
                !props.isChanging ?
                    <>
                        <button onClick={() => props.toggleIsChanging(true)}>Изменить</button>
                        <h2 className={s.title}>{props.name}</h2>
                        <img src={props.main_img} alt="location"/>
                        <div className={s.description}>{props.description}</div>
                    </>
                    :
                    <ChangeForm handleSubmit={props.handleSubmit}
                                handleFindKey={props.handleFindKey}
                                handleFocus={props.handleChangeInputs}
                                handleChange={props.handleChange}
                                isEmptyInputs={props.isEmptyInputs}
                                isPhotoTypeWrong={props.isPhotoTypeWrong}
                                handleChangeFile={props.handleChangeFile}
                                description={props.description}
                                name={props.name}
                    />
            }
            {
                props.isChanging &&
                <button onClick={props.deleteLocation}>Удалить локу</button>
            }


            <NavLink to={`/m-admin/${props.location_id}/create_halls`}>
                Создать зал
            </NavLink>


            {
                props.halls &&
                props.halls.map(l => {
                    let last = props.halls[props.halls.length - 1].id
                    return (
                        <div className={s.locationContainer} key={l.id}>
                            <MuseumItemsList prev={l.prev} id={l.id} last={last} img={l.img} name={l.name} description={l.description} locations={props.halls} swapLocations={props.swapHalls} />
                            <NavLink to={`/m-admin/${props.location_id}/${l.id}`}>Перейти</NavLink>
                        </div>
                    )
                })
            }
        </div>
    );
}

export default Location;
