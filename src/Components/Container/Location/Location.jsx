import React from 'react';
import s from './Location.module.css'

import ChangeForm from "../../../Common/ChangeForm/ChangeForm";

const Location = (props) => {
    return (
        <div className={s.museum}>
            {
                !props.isChanging ?
                    <>
                        <button onClick={() => props.toggleIsChanging(true)}>Изменить</button>
                        <h2 className={s.title}>{props.name}</h2>
                        <img src={props.main_img} alt="location"/>
                        <div className={s.description}>{props.description}</div>
                    </>
                    :
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
            }
            {
                props.isChanging &&
                <button onClick={props.deleteLocation}>Удалить локу</button>
            }
        </div>
    );
}

export default Location;
