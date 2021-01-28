import React from 'react';
import s from './Museum.module.css'
import {NavLink} from "react-router-dom";
import ChangeForm from "../../../Common/ChangeForm/ChangeForm";
import MuseumItemsList from "../../../Common/MuseumItemsList/MuseumItemsList";
import MuseumInformation from "../../../Common/MuseumInformation/MuseumInformation";
import prev from "../../../assets/images/left-chevron.svg";
import artSquare from "../../../assets/images/artsquare.svg";
import information from "../../../assets/images/information-2-copy.svg";

const Museum = (props) => {
    let locations = props.locations
    return (
        <div className={'outer'}>
            <div className={'container'}>
                <div className={s.museum}>
                    <div className={'artContainer'}>
                        <div className={'artSquare'}>
                            <img className={'artImg'} src={artSquare} alt="artSquare"/>
                            <span>art</span>
                            <span className={'way'}>way</span>
                        </div>
                        <NavLink to={'/'} className={'information'}>
                            <img src={information} alt="information"/>
                        </NavLink>
                    </div>
                    { props.isUserMuseumAdmin &&(
                        !props.isChanging ?
                            <>
                                <button className={s.change} onClick={() => props.toggleIsChanging(true)}>Изменить данные музея</button>
                                <MuseumInformation name={props.name} description={props.description} main_img={props.main_img} />
                            </>
                            :
                            <>
                                <ChangeForm text={'Изменение данных музея'} {...props} />
                            </>)
                    }

                    <div className={s.createContainer}>
                        {
                            props.isUserMuseumAdmin &&
                            <NavLink className={'create'} to={'/m-admin/create_location'}>
                                Создать локацию
                            </NavLink>
                        }
                        {
                            props.isUserMuseumSuperAdmin &&
                            <NavLink className={'create'} to={'/m-admin/hr-management'}>
                                Персонал
                            </NavLink>
                        }
                    </div>

                    <div className={s.titleContainer}>
                        <h2 className={s.itemsTitle}>
                            Список локаций
                        </h2>
                        <h3 className={s.title}>
                            {props.name}
                            <button onClick={() => props.history.goBack()} className={'backBtn'}>
                                <img src={prev} alt="back"/>
                            </button>
                        </h3>
                    </div>



                    {
                        locations &&
                        locations.map(l => {
                            let last =locations[locations.length - 1].id
                            return (
                                <div className={s.locationContainer} key={l.id}>
                                    {
                                        !props.isUserMuseumAdmin
                                            ?
                                            <NavLink to={`/locations/${l.id}/halls`}>
                                                <MuseumItemsList history={props.his} isUserMuseumAdmin={props.isUserMuseumAdmin} prev={l.prev} id={l.id} last={last} img={l.img} name={l.name} description={l.description} swapLocations={props.swapLocations} />
                                            </NavLink>
                                            :
                                            <>
                                                <MuseumItemsList isUserMuseumAdmin={props.isUserMuseumAdmin} prev={l.prev} id={l.id} last={last} img={l.img} name={l.name} description={l.description} swapLocations={props.swapLocations} />
                                                <NavLink className={s.goInside} to={`/m-admin/${l.id}`}>Перейти к локации</NavLink>
                                            </>

                                    }

                                    {
                                        props.isRelocate &&
                                        <div>
                                            <button className={s.relocateBtn} onClick={() => props.selectLocation(l.id)}>Выбрать локацию для перемещения</button>
                                        </div>
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

export default Museum;
