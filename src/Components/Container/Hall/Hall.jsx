import React from 'react';
import s from './Hall.module.css'
import ChangeForm from "../../../Common/ChangeForm/ChangeForm";

const Hall = (props) => {
    return (
        <div className={s.museum}>
            <h1>Зал</h1>
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
                <button onClick={props.deleteHall}>Удалить зал</button>
            }

            {/*<NavLink to={'/m-admin/create_hall'}>*/}
            {/*    Создать артифакт*/}
            {/*</NavLink>*/}

            {/*<MuseumItemsList locations={props.halls} swapLocations={props.swapHalls} />*/}
        </div>
    );
}

export default Hall;
