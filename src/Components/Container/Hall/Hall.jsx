import React from 'react';
import s from './Hall.module.css'
import ChangeForm from "../../../Common/ChangeForm/ChangeForm";
import MuseumItemsList from "../../../Common/MuseumItemsList/MuseumItemsList";
import {NavLink} from "react-router-dom";

const Hall = (props) => {
    let artifacts = props.artifacts
    return (
        <div className={s.museum}>
            <h1>Зал</h1>
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
                        <ChangeForm {...props} />)
            }
            {
                props.isChanging &&
                <button onClick={props.deleteHall}>Удалить зал</button>
            }
            {
                props.isUserMuseumAdmin &&
                <NavLink to={`/m-admin/${props.location_id}/${props.hall_id}/create_artifacts`}>
                Создать артефактыч
                </NavLink>
            }

            {
                artifacts &&
                artifacts.map(l => {
                    let last = artifacts[artifacts.length - 1].id
                    return (
                        <div className={s.locationContainer} key={l.id}>
                            <MuseumItemsList isUserMuseumAdmin={props.isUserMuseumAdmin} prev={l.prev} id={l.id} last={last} img={l.img} name={l.name} description={l.description} locations={props.halls} swapLocations={props.swapArtifacts} />
                            {
                                props.isUserMuseumAdmin
                                    ? <NavLink to={`/m-admin/${props.location_id}/${props.hall_id}/${l.id}`}>Перейти</NavLink>
                                    : <NavLink to={`/artifacts/${l.id}`}>Перейти к артефакту</NavLink>
                            }
                            { //Находится ли данный товар в корзине
                                props.isUserMuseumAdmin && (
                                props.print.some(item => item.id === l.id) ?
                                    <button className={s.inCart} onClick={() => props.deleteOneArtifact(l.id)}>
                                        Удалить из печати
                                    </button>

                                    :   <button className={s.noCart} onClick={() => props.addArtifactToPrint(l)}
                                    >
                                        Добавить к печати
                                    </button>)
                            }

                            {
                                props.isUserMuseumAdmin &&
                                    <NavLink to={`/m-admin/relocate/${props.location_id}/${props.hall_id}/${l.id}`}>Переместить артефакт</NavLink>
                            }

                        </div>
                    )
                })
            }
        </div>
    );
}

export default Hall;
