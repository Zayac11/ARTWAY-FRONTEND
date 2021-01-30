import React from 'react';
import s from './Hall.module.css'
import MuseumItemsList from "../../../Common/MuseumItemsList/MuseumItemsList";
import {NavLink} from "react-router-dom";
import prev from "../../../assets/images/left-chevron.svg";
import MuseumCard from "../../../Common/MuseumCard/MuseumCard";
import TopContainer from "../../../Common/Top/TopContainer";
import edit from "../../../assets/images/edit.svg";
import BlueButton from "../../../Common/BlueButton/BlueButton";

const Hall = (props) => {
    let artifacts = props.artifacts
    return (
        <div className={'outer'}>
            <div className={'container'}>
                <div className={'museum'}>
                    <TopContainer isUserMuseumAdmin={props.isUserMuseumAdmin} />

                    {/*{*/}
                    {/*    props.isUserMuseumAdmin && <NavLink className={'create'} to={'/m-admin/print'}>Артефакты для печати</NavLink>*/}
                    {/*}*/}
                    {/*{*/}
                    {/*    props.isUserMuseumAdmin &&(*/}
                    {/*        !props.isChanging ?*/}
                    {/*            <>*/}
                    {/*                <button className={s.change} onClick={() => props.toggleIsChanging(true)}>Изменить или удалить</button>*/}
                    {/*                <MuseumInformation name={props.name} description={props.description} main_img={props.main_img} />*/}
                    {/*            </>*/}
                    {/*            :*/}
                    {/*            <ChangeForm text={'Изменение зала'} {...props} />)*/}
                    {/*}*/}
                    {/*{*/}
                    {/*    props.isChanging &&*/}
                    {/*    <button className={s.deleteBtn} onClick={props.deleteHall}>Удалить зал</button>*/}
                    {/*}*/}

                    {
                        props.isUserMuseumAdmin
                            ?
                            <>
                                <div className={s.topContainer}>
                                <button onClick={() => props.history.goBack()} className={'adminBackBtn'}>
                                    <img src={prev} alt="back"/>
                                </button>
                                {
                                    props.isChanging
                                        ?
                                        <input type="text" value={props.name} onKeyUp={props.handleFindKey} name={'name'} onFocus={props.handleFocus} onChange={props.handleChange}/>
                                        :
                                        <div className={s.name}>
                                            {props.name}
                                        </div>
                                }
                                <div onClick={() => props.toggleIsChanging(!props.isChanging)} >
                                    <img src={edit} alt="edit"/>
                                </div>
                            </div>
                                <div className={'titleContainer'}>
                                    <h2 className={'itemsTitle'}>
                                        Список экспонатов
                                    </h2>
                                    {
                                        props.isUserMuseumAdmin &&(
                                            props.isCardsChanging
                                                ?
                                                <button onClick={() => {props.toggleIsCardsChanging(false)}} className={'cards_changing_button'}>
                                                    Сохранить
                                                </button>
                                                :
                                                <button onClick={() => props.toggleIsCardsChanging(true)} className={'cards_changing_button'}>
                                                    Изменить порядок
                                                </button>)
                                    }
                                </div>
                            </>
                            :
                            <>
                                <div className={'userTitleContainer'}>
                                    <h2 className={'itemsTitle'}>
                                        Список экспонатов
                                    </h2>
                                    <button onClick={() => props.history.goBack()} className={'backBtn'}>
                                        <img src={prev} alt="back"/>
                                    </button>
                                </div>
                            </>
                    }

                    {
                        artifacts &&
                        artifacts.map(l => {
                            let last = artifacts[artifacts.length - 1].id
                            return (
                                <div className={'locationContainer'} key={l.id}>
                                    {
                                        !props.isUserMuseumAdmin
                                            ?
                                            <NavLink to={`/artifacts/${l.id}`}>
                                                <MuseumItemsList isUserMuseumAdmin={props.isUserMuseumAdmin} prev={l.prev} id={l.id} last={last} img={l.img} name={l.name} description={l.description} locations={props.halls} swapLocations={props.swapArtifacts} />
                                            </NavLink>
                                            :
                                            <MuseumCard isCardsChanging={props.isCardsChanging} link={`/m-admin/${props.location_id}/${props.hall_id}/${l.id}`} isUserMuseumAdmin={props.isUserMuseumAdmin} prev={l.prev} id={l.id} last={last} name={l.name} swapLocations={props.swapArtifacts} />
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
                                        <NavLink className={s.goInside} to={`/m-admin/relocate/${props.location_id}/${props.hall_id}/${l.id}`}>Переместить экспонат</NavLink>
                                    }

                                </div>
                            )
                        })
                    }
                    {
                        props.isUserMuseumAdmin &&
                            <div className={s.buttonContainer}>
                                <BlueButton text={'Создать экспонат'} type={'link'} link={`/m-admin/${props.location_id}/${props.hall_id}/create_artifacts`} />
                            </div>

                    }
                </div>
            </div>
        </div>
    );
}

export default Hall;
