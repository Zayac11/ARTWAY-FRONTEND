import React from 'react';
import s from './Location.module.css'
import MuseumCard from "../../../Common/MuseumCard/MuseumCard";
import TopContainer from "../../../Common/Top/TopContainer";
import BlueButton from "../../../Common/BlueButton/BlueButton";
import RedTransparentBtn from "../../../Common/RedTransparentBtn/RedTransparentBtn";
import ItemInformation from "../../../Common/ItemInformation/ItemInformation";

const Location = (props) => {
    let halls = props.halls
    return (
        <div className={'outer'}>
            <div className={'container'}>
                <div className={'museum'}>
                    <TopContainer isUserMuseumAdmin={props.isUserMuseumAdmin} />

                    <ItemInformation isUserMuseumAdmin={props.isUserMuseumAdmin}
                                     isChanging={props.isChanging}
                                     name={props.name}
                                     locationName={props.locationName}
                                     isCardsChanging={props.isCardsChanging}
                                     toggleIsCardsChanging={props.toggleIsCardsChanging}
                                     toggleIsChanging={props.toggleIsChanging}
                                     history={props.history}
                                     handleFindKey={props.handleFindKey}
                                     handleFocus={props.handleFocus}
                                     handleChange={props.handleChange}
                                     handleSubmit={props.handleSubmit}
                    />

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
                            <div className={'buttonContainer'}>
                                <BlueButton type={'btn'} handleSubmit={props.createLocation} text={'Создать новый зал'} />
                                {
                                    props.isChanging && <RedTransparentBtn type={'btn'} handleSubmit={props.deleteLocation} text={'Удалить зал'} />
                                }

                            </div>
                        }
                    {
                        props.isUserMuseumAdmin
                        &&
                        <div className={'itemsBottom'}></div>
                    }



                </div>
            </div>
        </div>

    )
}

export default Location;
