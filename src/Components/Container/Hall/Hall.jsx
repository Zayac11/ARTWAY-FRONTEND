import React from 'react';
import s from './Hall.module.css'
import ChangeForm from "../../../Common/ChangeForm/ChangeForm";
import MuseumItemsList from "../../../Common/MuseumItemsList/MuseumItemsList";
import {NavLink} from "react-router-dom";
import MuseumInformation from "../../../Common/MuseumInformation/MuseumInformation";
import prev from "../../../assets/images/left-chevron.svg";

const Hall = (props) => {
    let artifacts = props.artifacts
    return (
        <div className={'outer'}>
            <div className={'container'}>
                <div className={s.museum}>
                    <button onClick={() => props.history.goBack()} className={'backBtn'}>
                        <img src={prev} alt="back"/>
                    </button>
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
                                <ChangeForm text={'Изменение зала'} {...props} />)
                    }
                    {
                        props.isChanging &&
                        <button className={s.deleteBtn} onClick={props.deleteHall}>Удалить зал</button>
                    }
                    {
                        props.isUserMuseumAdmin &&
                        <NavLink className={'create'} to={`/m-admin/${props.location_id}/${props.hall_id}/create_artifacts`}>
                            Создать артефакт
                        </NavLink>
                    }
                    <div className={s.titleContainer}>
                        <h2 className={s.itemsTitle}>
                            Список артефактов
                        </h2>
                        <button onClick={() => props.history.goBack()} className={'backBtn'}>
                            <img src={prev} alt="back"/>
                        </button>
                    </div>

                    {
                        artifacts &&
                        artifacts.map(l => {
                            let last = artifacts[artifacts.length - 1].id
                            return (
                                <div className={s.locationContainer} key={l.id}>
                                    <MuseumItemsList isUserMuseumAdmin={props.isUserMuseumAdmin} prev={l.prev} id={l.id} last={last} img={l.img} name={l.name} description={l.description} locations={props.halls} swapLocations={props.swapArtifacts} />
                                    {
                                        props.isUserMuseumAdmin
                                            ? <NavLink className={s.goInside} to={`/m-admin/${props.location_id}/${props.hall_id}/${l.id}`}>Перейти</NavLink>
                                            : <NavLink className={s.goInside} to={`/artifacts/${l.id}`}>Перейти к артефакту</NavLink>
                                    }
                                    { //Находится ли данный товар в корзине
                                        props.isUserMuseumAdmin && (
                                            props.print.some(item => item.id === l.id) ?
                                                <button className={s.inCart} onClick={() => props.deleteOneArtifact(l.id)}>
                                                    Удалить из печати
                                                </button>

                                                :   <button className={s.inCart} onClick={() => props.addArtifactToPrint(l)}
                                                >
                                                    Добавить к печати
                                                </button>)
                                    }

                                    {
                                        props.isUserMuseumAdmin &&
                                        <NavLink className={s.goInside} to={`/m-admin/relocate/${props.location_id}/${props.hall_id}/${l.id}`}>Переместить артефакт</NavLink>
                                    }

                                </div>
                            )
                        })
                    }
                </div>
            </div>
        </div>
    );
}

export default Hall;
