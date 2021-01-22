import React from 'react';
import s from './ChangeForm.module.css'
import Input from "../Input/Input";
import Textarea from "../Textarea/Textarea";
import prev from "../../assets/images/left-chevron.svg";

const ChangeForm = (props) => {
    return (
        <div className={s.form}>
            <button onClick={() => props.history.goBack()} className={'backBtn'}>
                <img src={prev} alt="back"/>
            </button>
            <h1 className={s.title}>{props.text}</h1>
            <Input text={'Название'} handleFindKey={props.handleFindKey} value={props.name} type={'text'} name={'name'} handleFocus={props.handleChangeInputs} handleChange={props.handleChange} />

            <Textarea text={'Описание'} value={props.description} name={'description'} handleFocus={props.handleChangeInputs} handleChange={props.handleChange} />

            {
                props.isEmptyInputs &&
                <div className='form__wrong'>
                    Все поля должны быть заполнены
                </div>
            }

            <Input text={'Фотография'} type={'file'} name={'img'} handleFocus={props.handleChangeInputs} handleChange={props.handleChangeFile} />
            {
                props.isItemArtifact &&
                    <>
                        <Input text={'Аудиофайл'} type={'file'} name={'audio'} handleFocus={props.handleChangeInputs} handleChange={props.handleChangeFile} />
                        <Input text={'Ссылка на видео'} handleFindKey={props.handleFindKey} type={'text'} value={props.video} name={'video'} handleFocus={props.handleChangeInputs} handleChange={props.handleChange} />
                    </>
            }
            {
                props.isPhotoTypeWrong &&
                <div className='form__wrong'>
                    Пожалуйста, добавьте картинку
                </div>
            }
            {
                props.isAudioTypeWrong &&
                <div className='form__wrong'>
                    Пожалуйста, добавьте аудио
                </div>
            }
            {
                props.isVideoUrlWrong &&
                <div className='form__wrong'>
                    Пожалуйста, добавьте корректную ссылку на видео
                </div>
            }
            <button className={'submit'} onClick={props.handleSubmit}>Сохранить</button>
        </div>
    );
}

export default ChangeForm;
