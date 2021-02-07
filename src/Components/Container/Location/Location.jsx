import React from 'react';
import s from './Location.module.css'
import MuseumCard from "../../../Common/MuseumCard/MuseumCard";
import TopContainer from "../../../Common/Top/TopContainer";
import BlueButton from "../../../Common/BlueButton/BlueButton";
import RedTransparentBtn from "../../../Common/RedTransparentBtn/RedTransparentBtn";
import ItemInformation from "../../../Common/ItemInformation/ItemInformation";
import DeleteModal from "../../../Common/DeleteModal/DeleteModal";

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
                                     handleFocus={props.handleChangeInputs}
                                     handleChange={props.handleChange}
                                     handleSubmit={props.handleSubmit}
                                     isEmptyInputs={props.isEmptyInputs}
                                     text={'Список залов'}
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
                        (halls &&
                            halls.length === 0) &&
                        <div className={'emptyLocations'}>
                            Залы не найдены
                        </div>
                    }
                        {
                            props.isUserMuseumAdmin &&
                            <div className={'buttonContainer'}>
                                <BlueButton type={'btn'} handleSubmit={props.createLocation} text={'Создать новый зал'} />
                                {
                                    props.isChanging && <RedTransparentBtn type={'withProps'} data={true} handleSubmit={props.toggleOpenModal} text={'Удалить локацию'} />
                                }

                            </div>
                        }
                    {
                        props.isUserMuseumAdmin
                        &&
                        <div className={'itemsBottom'}></div>
                    }

                    <DeleteModal isModalOpen={props.isModalOpen} toggleOpenModal={props.toggleOpenModal} deleteMuseum={props.deleteLocation} />

                </div>
            </div>
        </div>

    )
}

export default Location;
