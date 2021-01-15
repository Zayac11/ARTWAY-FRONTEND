import React from 'react';
import s from './Museum.module.css'
import Input from "../../../Common/Input/Input";
import Textarea from "../../../Common/Textarea/Textarea";
import {NavLink} from "react-router-dom";

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
                        <button onClick={props.handleSubmit}>Сохранить</button>
                        <Input text={'Название'} handleFindKey={props.handleFindKey} value={props.name} type={'text'} name={'name'} handleFocus={props.handleFocus} handleChange={props.handleChange} />

                        <Textarea text={'Описание'} value={props.description} name={'description'} handleFocus={props.handleFocus} handleChange={props.handleChange} />

                        {
                            props.isEmptyInputs &&
                            <div className='form__wrong'>
                                Все поля должны быть заполнены
                            </div>
                        }

                        <Input text={'Фотография'} type={'file'} name={'img'} handleFocus={props.handleFocus} handleChange={props.handleChangeFile} />
                        {
                            props.isPhotoTypeWrong &&
                                <div className='form__wrong'>
                                    Выберите картинку
                                </div>
                        }
                    </>

            }


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
