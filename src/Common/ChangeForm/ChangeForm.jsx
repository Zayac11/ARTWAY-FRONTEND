import React from 'react';
import s from './ChangeForm.module.css'
import Input from "../Input/Input";
import Textarea from "../Textarea/Textarea";
import BlueButton from "../BlueButton/BlueButton";
import RedTransparentBtn from "../RedTransparentBtn/RedTransparentBtn";
import BackBtn from "../BackBtn/BackBtn";

const ChangeForm = (props) => {
    return (
        <>
        <div className={s.form}>
            <div className={s.titleContainer}>
                <h1 className={s.title}>{props.text}</h1>
                {
                    !props.isChanging &&
                        <BackBtn history={props.history} />
                }
            </div>

            <Input required={true} text={'Название'} handleFindKey={props.handleFindKey} value={props.name} type={'text'} name={'name'} handleFocus={props.handleChangeInputs} handleChange={props.handleChange} />

            <Textarea required={true} text={'Описание'} value={props.description} name={'description'} handleFocus={props.handleChangeInputs} handleChange={props.handleChange} />

            {
                !props.isItemArtifact &&
                (!props.isChangingArtifact && props.isUserMuseumAdmin) &&
                <Input required={true} text={'Время жизни билета (ч.)'} handleFindKey={props.handleFindKey} value={props.ticket_lifetime} type={'number'} name={'ticket_lifetime'} handleFocus={props.handleChangeInputs} handleChange={props.handleChange} />
            }


            {
                props.isItemArtifact && <Input text={'Ссылка на видео'} handleFindKey={props.handleFindKey} type={'text'} value={props.video} name={'video'} handleFocus={props.handleChangeInputs} handleChange={props.handleChange} />
            }
            {
                props.isEmptyInputs &&
                <div className='form__wrong'>
                    Пожалуйста, заполните важные поля
                </div>
            }

            {
                props.isVideoUrlWrong &&
                <div className='form__wrong'>
                    Пожалуйста, добавьте корректную ссылку на видео
                </div>
            }
            <div className={s.fileInputContainer}>
                <input type="file" name={'img'} id={'fileImg'} onChange={props.handleChangeFile} onFocus={props.handleFocus} className={s.fileInput}/>
                <label htmlFor="fileImg">
                    <span>Загрузить фото</span>
                </label>
                {
                    props.img !== '' &&
                    <span className={s.fileName}>{props.img.name}</span>
                }
            </div>
            {
                props.isItemArtifact &&
                    <>
                        <div className={s.fileInputContainer}>
                            <input type="file" name={'audio'} id={'fileAudio'} onChange={props.handleChangeFile} onFocus={props.handleFocus} className={s.fileInput}/>
                            <label htmlFor="fileAudio">
                                <span>Загрузить аудио</span>
                            </label>
                            {
                                props.img !== '' &&
                                <span className={s.fileName}>{props.audio.name}</span>
                            }
                        </div>
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
                !props.isInputSizeRight &&
                <div className='form__wrong'>
                    Превышена допустимая длина полей
                </div>
            }
            <div className={s.saveContainer}>
                <BlueButton type={'btn'} handleSubmit={props.handleSubmit} text={'Сохранить и выйти'} />
            </div>
            {
                (props.isUserMuseumAdmin && props.isChangingArtifact) &&
                <RedTransparentBtn type={'withProps'} data={true} text={'Удалить экспонат'} handleSubmit={props.toggleOpenModal} />
            }

        </div>
        </>
    );
}

export default ChangeForm;
