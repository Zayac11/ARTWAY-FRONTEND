import React from 'react';
import s from './Museum.module.css'
import {NavLink} from "react-router-dom";
import ChangeForm from "../../../Common/ChangeForm/ChangeForm";

const Museum = (props) => {
    return (
        <div className={s.museum}>
            {
                !props.isChanging ?
                    <>
                        <button onClick={() => props.toggleIsChanging(true)}>Изменить</button>
                        <h2 className={s.title}>{props.name}</h2>
                        <img src={props.main_img} alt="museum"/>
                        <div className={s.description}>{props.description}</div>
                    </>
                    :
                    <>
                        <ChangeForm handleSubmit={props.handleSubmit}
                                    handleFindKey={props.handleFindKey}
                                    handleFocus={props.handleChangeInputs}
                                    handleChange={props.handleChange}
                                    isEmptyInputs={props.isEmptyInputs}
                                    isPhotoTypeWrong={props.isPhotoTypeWrong}
                                    handleChangeFile={props.handleChangeFile}
                                    description={props.description}
                                    name={props.name}
                        />
                    </>

            }

            <NavLink to={'/m-admin/create_location'}>
                Создать локу
            </NavLink>
            <div className={s.locationContainer}>
                {
                    props.locations &&
                    props.locations.map(l => {
                        let last = props.locations[props.locations.length-1]
                        return (
                            <div key={l.id} className={s.location}>
                                <div className={s.locationTitle}>
                                    {l.name}
                                </div>
                                <img src={l.img} alt="location"/>
                                <div>
                                    {l.description}
                                </div>
                                <NavLink to={`/m-admin/${l.id}`}>Перейти</NavLink>
                                {
                                    l.prev !== null &&
                                    <button onClick={() => props.swapLocations('up', l.id)}>вверх</button>
                                }
                                {
                                    l.id !== last.id &&
                                    <button onClick={() => props.swapLocations('down', l.id)}>вниз</button>
                                }

                            </div>
                        )
                    })
                }
            </div>


        </div>
    );
}

export default Museum;
