import React from 'react';
import MuseumItemsList from "../../../Common/MuseumItemsList/MuseumItemsList";
import {NavLink} from "react-router-dom";
import MuseumCard from "../../../Common/MuseumCard/MuseumCard";
import TopContainer from "../../../Common/Top/TopContainer";
import BlueButton from "../../../Common/BlueButton/BlueButton";
import RedTransparentBtn from "../../../Common/RedTransparentBtn/RedTransparentBtn";
import ItemInformation from "../../../Common/ItemInformation/ItemInformation";
import DeleteModal from "../../../Common/DeleteModal/DeleteModal";
import TransparentButton from "../../../Common/TransparentButton/TransparentButton";
import s from './Hall.module.css'

const Hall = (props) => {
    let artifacts = props.artifacts
    return (
        <div className={'outer'}>
            <div className={'container'}>
                <div className={'museum'}>
                    <TopContainer isUserMuseumAdmin={props.isUserMuseumAdmin} />

                    <ItemInformation isUserMuseumAdmin={props.isUserMuseumAdmin}
                                     isChanging={props.isChanging}
                                     name={props.sectionName}
                                     link={`/m-admin/${props.location_id}`}
                                     isCardsChanging={props.isCardsChanging}
                                     toggleIsCardsChanging={props.toggleIsCardsChanging}
                                     toggleIsChanging={props.toggleIsChanging}
                                     history={props.history}
                                     handleFindKey={props.handleFindKey}
                                     handleFocus={props.handleChangeInputs}
                                     handleChange={props.handleChange}
                                     handleSubmit={props.handleSubmit}
                                     isEmptyInputs={props.isEmptyInputs}
                                     locationName={props.hallName}
                                     isInputSizeRight={props.isInputSizeRight}
                                     text={'Список экспонатов'}
                    />

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
                                                <MuseumItemsList prev={l.prev} id={l.id} last={last} img_1={l.img_1} img_2={l.img_2} img_3={l.img_3} img_4={l.img_4} img_5={l.img_5} name={l.name} description={l.description} locations={props.halls} swapLocations={props.swapArtifacts} />
                                            </NavLink>
                                            :
                                            <MuseumCard isCardsChanging={props.isCardsChanging} link={`/m-admin/${props.location_id}/${props.hall_id}/${l.id}`} isUserMuseumAdmin={props.isUserMuseumAdmin} prev={l.prev} id={l.id} last={last} name={l.name} swapLocations={props.swapArtifacts} />
                                    }


                                </div>
                            )
                        })
                    }
                    {
                        (artifacts &&
                            artifacts.length === 0) &&
                            <div className={'emptyLocations'}>
                                Экспонаты не найдены
                            </div>
                    }
                    {
                        props.isUserMuseumAdmin &&
                        <div className={'buttonContainer'}>
                            <div className={s.createButton}>
                                <BlueButton text={'Создать экспонат'} type={'link'} link={`/m-admin/${props.location_id}/${props.hall_id}/create_artifacts`} />
                            </div>
                            <div className={s.buttons}>
                                {
                                    props.isChanging
                                        ? <BlueButton type={'btn'} handleSubmit={props.handleSubmit} text={'Сохранить'} />
                                        : <BlueButton type={'withProps'} data={true} handleSubmit={props.toggleIsChanging} text={'Редактировать'} />
                                }
                                <div className={s.createButtonTransparent}>
                                    <TransparentButton text={'Создать экспонат'} type={'link'} link={`/m-admin/${props.location_id}/${props.hall_id}/create_artifacts`} />
                                </div>
                            </div>
                            {
                                props.isChanging && <RedTransparentBtn type={'withProps'} data={true} handleSubmit={props.toggleOpenModal} text={'Удалить зал'} />
                            }
                        </div>
                    }
                    {
                        props.isUserMuseumAdmin
                        &&
                        <div className={'itemsBottom'}></div>
                    }
                    <DeleteModal isModalOpen={props.isModalOpen} toggleOpenModal={props.toggleOpenModal} deleteMuseum={props.deleteHall} />
                </div>
            </div>
        </div>
    );
}

export default Hall;
