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
                props.isUserMuseumAdmin && <NavLink to={'/m-admin/print'}>Артефакты для печати</NavLink>
            }
            {
                !props.isChanging ?
                    <>
                        <button onClick={() => props.toggleIsChanging(true)}>Изменить или удалить</button>
                        <h2 className={s.title}>{props.name}</h2>
                        <img src={props.main_img} alt="location"/>
                        <div className={s.description}>{props.description}</div>
                    </>
                    :
                        <ChangeForm {...props} />
            }
            {
                props.isChanging &&
                <button onClick={props.deleteHall}>Удалить зал</button>
            }

            <NavLink to={`/m-admin/${props.location_id}/${props.hall_id}/create_artifacts`}>
                Создать артефактыч
            </NavLink>

            {
                props.artifacts &&
                props.artifacts.map(l => {
                    let last = props.artifacts[props.artifacts.length - 1].id
                    return (
                        <div className={s.locationContainer} key={l.id}>
                            <MuseumItemsList prev={l.prev} id={l.id} last={last} img={l.img} name={l.name} description={l.description} locations={props.halls} swapLocations={props.swapArtifacts} />
                            <NavLink to={`/m-admin/${props.location_id}/${props.hall_id}/${l.id}`}>Перейти</NavLink>
                            { //Находится ли данный товар в корзине
                                props.print.some(item => item.id === l.id) ?
                                    <button className={s.inCart} onClick={() => props.deleteOneArtifact(l.id)}>
                                        Удалить из печати
                                    </button>

                                    :   <button className={s.noCart} onClick={() => props.addArtifactToPrint(l)}
                                    >
                                        Добавить к печати
                                    </button>
                            }
                            {/*<button onClick={() => props.addArtifactToPrint(l)}>добавить к печати</button>*/}
                        </div>
                    )
                })
            }
        </div>
    );
}

export default Hall;
