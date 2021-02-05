import React from 'react';
import s from './ChangeForm.module.css'
import Input from "../Input/Input";
import Textarea from "../Textarea/Textarea";
import prev from "../../assets/images/left-chevron.svg";
import BlueButton from "../BlueButton/BlueButton";
import RedTransparentBtn from "../RedTransparentBtn/RedTransparentBtn";

const ChangeForm = (props) => {
    return (
        <div className={s.form}>
            <div className={s.titleContainer}>
                <h1 className={s.title}>{props.text}</h1>
                {
                    !props.isChanging &&
                    <button onClick={() => props.history.goBack()} className={'backBtn'}>
                        <img src={prev} alt="back"/>
                    </button>
                }
            </div>

            <Input required={true} text={'Название'} handleFindKey={props.handleFindKey} value={props.name} type={'text'} name={'name'} handleFocus={props.handleChangeInputs} handleChange={props.handleChange} />

            <Textarea required={true} text={'Описание'} value={props.description} name={'description'} handleFocus={props.handleChangeInputs} handleChange={props.handleChange} />

            {
                props.isEmptyInputs &&
                <div className='form__wrong'>
                    Пожалуйста, заполните важные поля
                </div>
            }

            {
                props.isItemArtifact && <Input text={'Ссылка на видео'} handleFindKey={props.handleFindKey} type={'text'} value={props.video} name={'video'} handleFocus={props.handleChangeInputs} handleChange={props.handleChange} />
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

            <div className={s.saveContainer}>
                <BlueButton type={'btn'} handleSubmit={props.handleSubmit} text={'Сохранить и выйти'} />
            </div>
            {
                (props.isUserMuseumAdmin && props.isChangingArtifact) &&
                <RedTransparentBtn type={'withProps'} text={'Удалить экспонат'} handleSubmit={props.deleteArtifact}
                                   data={{location_id: props.location_id, hall_id: props.hall_id, artifact_id: props.artifactData.id} }
                />
            }

        </div>
    );
}

export default ChangeForm;
