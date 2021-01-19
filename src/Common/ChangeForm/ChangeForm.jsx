import React from 'react';
import s from './ChangeForm.module.css'
import Input from "../Input/Input";
import Textarea from "../Textarea/Textarea";

const ChangeForm = (props) => {

    return (
        <>
            <button onClick={props.handleSubmit}>Сохранить</button>
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
                <Input text={'Аудиофайл'} type={'file'} name={'audio'} handleFocus={props.handleChangeInputs} handleChange={props.handleChangeFile} />
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
        </>
    );
}

export default ChangeForm;
