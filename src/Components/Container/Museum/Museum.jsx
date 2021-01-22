import React from 'react';
import s from './Museum.module.css'
import {NavLink} from "react-router-dom";
import ChangeForm from "../../../Common/ChangeForm/ChangeForm";
import MuseumItemsList from "../../../Common/MuseumItemsList/MuseumItemsList";
import MuseumInformation from "../../../Common/MuseumInformation/MuseumInformation";

const Museum = (props) => {
    let locations = props.locations
    return (
        <div className={s.museum}>
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

            <h3 className={s.itemsTitle}>
                Список локаций музея
            </h3>

            {
                locations &&
                locations.map(l => {
                    let last =locations[locations.length - 1].id
                    return (
                        <div className={s.locationContainer} key={l.id}>
                            <MuseumItemsList isUserMuseumAdmin={props.isUserMuseumAdmin} prev={l.prev} id={l.id} last={last} img={l.img} name={l.name} description={l.description} swapLocations={props.swapLocations} />
                            {
                                props.isUserMuseumAdmin
                                ? <NavLink className={s.goInside} to={`/m-admin/${l.id}`}>Перейти к локации</NavLink>
                                : <NavLink className={s.goInside} to={`/locations/${l.id}/halls`}>Перейти к локации</NavLink>
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
    );
}

export default Museum;
