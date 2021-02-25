import React from 'react';
import s from './ChangeForm.module.css'
import Input from "../Input/Input";
import Textarea from "../Textarea/Textarea";
import BlueButton from "../BlueButton/BlueButton";
import RedTransparentBtn from "../RedTransparentBtn/RedTransparentBtn";
import BackBtn from "../BackBtn/BackBtn";
import InputFile from "../InputFile/InputFile";

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
            {
                !props.isItemArtifact &&
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
            }

            {
                props.isItemArtifact &&
                <div className={s.artifactFileInputContainer}>
                    <div>
                        Картинки
                    </div>
                    <InputFile handleDelete={props.deleteFromForm} text1={'Загрузить фото'} text2={'Обновить фото'} file={props.img_1} handleChangeFile={props.handleChangeFile} handleFocus={props.handleFocus} id={'fileImg1'} name={'img_1'} />
                    {
                        ((props.img_1 !== null) || (props.img_2 !== null)) &&
                        <InputFile handleDelete={props.deleteFromForm} text1={'Загрузить фото'} text2={'Обновить фото'} file={props.img_2} handleChangeFile={props.handleChangeFile} handleFocus={props.handleFocus} id={'fileImg2'} name={'img_2'} />
                    }
                    {
                        (props.img_2 !== null || props.img_3 !== null) &&
                        <InputFile handleDelete={props.deleteFromForm} text1={'Загрузить фото'} text2={'Обновить фото'} file={props.img_3} handleChangeFile={props.handleChangeFile} handleFocus={props.handleFocus} id={'fileImg3'} name={'img_3'} />
                    }
                    {
                        (props.img_3 !== null || props.img_4 !== null) &&
                        <InputFile handleDelete={props.deleteFromForm} text1={'Загрузить фото'} text2={'Обновить фото'} file={props.img_4} handleChangeFile={props.handleChangeFile} handleFocus={props.handleFocus} id={'fileImg4'} name={'img_4'} />
                    }
                    {
                        (props.img_4 !== null || props.img_5 !== null) &&
                        <InputFile handleDelete={props.deleteFromForm} text1={'Загрузить фото'} text2={'Обновить фото'} file={props.img_5} handleChangeFile={props.handleChangeFile} handleFocus={props.handleFocus} id={'fileImg5'} name={'img_5'} />
                    }

                </div>
            }

            {
                props.isItemArtifact &&
                <div className={s.artifactFileInputContainer}>
                    <div>
                        Аудио
                    </div>
                    <InputFile handleDelete={props.deleteFromForm} text1={'Загрузить аудио'} text2={'Обновить аудио'} file={props.audio_1} handleChangeFile={props.handleChangeFile} handleFocus={props.handleFocus} id={'fileAudio1'} name={'audio_1'} />
                    {
                        ((props.audio_1 !== null) || (props.audio_2 !== null)) &&
                        <InputFile handleDelete={props.deleteFromForm} text1={'Загрузить аудио'} text2={'Обновить аудио'} file={props.audio_2} handleChangeFile={props.handleChangeFile} handleFocus={props.handleFocus} id={'fileAudio2'} name={'audio_2'} />
                    }
                    {
                        (props.audio_2 !== null || props.audio_3 !== null) &&
                        <InputFile handleDelete={props.deleteFromForm} text1={'Загрузить аудио'} text2={'Обновить аудио'} file={props.audio_3} handleChangeFile={props.handleChangeFile} handleFocus={props.handleFocus} id={'fileAudio3'} name={'audio_3'} />
                    }
                    {
                        (props.audio_3 !== null || props.audio_4 !== null) &&
                        <InputFile handleDelete={props.deleteFromForm} text1={'Загрузить аудио'} text2={'Обновить аудио'} file={props.audio_4} handleChangeFile={props.handleChangeFile} handleFocus={props.handleFocus} id={'fileAudio4'} name={'audio_4'} />
                    }
                    {
                        (props.audio_4 !== null || props.audio_5 !== null) &&
                        <InputFile handleDelete={props.deleteFromForm} text1={'Загрузить аудио'} text2={'Обновить аудио'} file={props.audio_5} handleChangeFile={props.handleChangeFile} handleFocus={props.handleFocus} id={'fileAudio5'} name={'audio_5'} />
                    }

                </div>
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
            {
                props.isTicketLifeTimeWrong &&
                <div className='form__wrong'>
                    Пожалуйста, введите корректное время жизни билета
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
