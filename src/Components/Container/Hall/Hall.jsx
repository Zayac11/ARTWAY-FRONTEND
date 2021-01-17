import React from 'react';
import s from './Hall.module.css'
import ChangeForm from "../../../Common/ChangeForm/ChangeForm";
import MuseumItemsList from "../../../Common/MuseumItemsList/MuseumItemsList";
import {NavLink} from "react-router-dom";

const Hall = (props) => {
    return (
        <div className={s.museum}>
            <h1>Зал</h1>
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
                <button onClick={props.deleteHall}>Удалить зал</button>
            }

            {/*<NavLink to={'/m-admin/create_hall'}>*/}
            {/*    Создать артефакт*/}
            {/*</NavLink>*/}

            {
                props.artifacts &&
                props.artifacts.map(l => {
                    let last = props.artifacts[props.artifacts.length - 1].id
                    return (
                        <div className={s.locationContainer} key={l.id}>
                            <MuseumItemsList prev={l.prev} id={l.id} last={last} img={l.img} name={l.name} description={l.description} locations={props.halls} swapLocations={props.swapArtifacts} />
                            <NavLink to={`/m-admin/${props.location_id}/${props.hall_id}/${l.id}`}>Перейти</NavLink>
                        </div>
                    )
                })
            }
        </div>
    );
}

export default Hall;