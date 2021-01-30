import React from 'react';
import s from './Location.module.css'
import prev from "../../../assets/images/left-chevron.svg";
import MuseumCard from "../../../Common/MuseumCard/MuseumCard";
import TopContainer from "../../../Common/Top/TopContainer";
import BlueButton from "../../../Common/BlueButton/BlueButton";
import edit from '../../../assets/images/edit.svg'

const Location = (props) => {
    let halls = props.halls
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
                    {/*            </>*/}
                    {/*            :*/}
                    {/*            <ChangeForm text={'Изменение данных локации'} {...props}*/}
                    {/*            />)*/}
                    {/*}*/}

                    {/*{*/}
                    {/*    props.isChanging &&*/}
                    {/*    <button className={s.deleteBtn} onClick={props.deleteLocation}>Удалить локацию</button>*/}
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
                                        Список залов
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
                                        {props.locationName}
                                    </h2>
                                    <button onClick={() => props.history.goBack()} className={'backBtn'}>
                                        <img src={prev} alt="back"/>
                                    </button>
                                </div>
                            </>
                    }

                    {
                        halls &&
                        halls.map(l => {
                            let last = halls[halls.length - 1].id
                            return (
                                <div className={'locationContainer'} key={l.id}>
                                    {
                                        props.isUserMuseumAdmin
                                            ?
                                            <MuseumCard isCardsChanging={props.isCardsChanging} link={`/m-admin/${props.location_id}/${l.id}`} isUserMuseumAdmin={props.isUserMuseumAdmin} prev={l.prev} id={l.id} last={last} name={l.name} locations={props.halls} swapLocations={props.swapHalls} />
                                            :
                                            <MuseumCard isCardsChanging={props.isCardsChanging} link={`/halls/${l.id}/artifacts`} isUserMuseumAdmin={props.isUserMuseumAdmin} prev={l.prev} id={l.id} last={last} name={l.name} />

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

                    {
                        props.isUserMuseumAdmin &&
                        <div className={s.buttonContainer}>
                            <BlueButton type={'btn'} handleSubmit={props.createLocation} text={'Создать зал'} />
                        </div>
                    }

                </div>
            </div>
        </div>

    )
}

export default Location;
