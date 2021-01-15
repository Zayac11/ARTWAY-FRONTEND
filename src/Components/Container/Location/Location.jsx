import React from 'react';
import s from './Location.module.css'
import Input from "../../../Common/Input/Input";
import Textarea from "../../../Common/Textarea/Textarea";

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
        </div>
    );
}

export default Location;
