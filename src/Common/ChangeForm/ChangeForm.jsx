import React from 'react';
import s from './ChangeForm.module.css'
import Input from "../Input/Input";
import Textarea from "../Textarea/Textarea";
import prev from "../../assets/images/left-chevron.svg";
import BlueButton from "../BlueButton/BlueButton";

const ChangeForm = (props) => {
    return (
        <div className={s.form}>

            {
                !props.isChanging &&
                <button onClick={() => props.history.goBack()} className={'backBtn'}>
                    <img src={prev} alt="back"/>
                </button>
            }

            <h1 className={s.title}>{props.text}</h1>
            <Input text={'Название'} handleFindKey={props.handleFindKey} value={props.name} type={'text'} name={'name'} handleFocus={props.handleChangeInputs} handleChange={props.handleChange} />

            <Textarea text={'Описание'} value={props.description} name={'description'} handleFocus={props.handleChangeInputs} handleChange={props.handleChange} />

            {
                props.isEmptyInputs &&
                <div className='form__wrong'>
                    Все поля должны быть заполнены
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

            {/*<Input text={'Фотография'} type={'file'} name={'img'} handleFocus={props.handleChangeInputs} handleChange={props.handleChangeFile} />*/}
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
                                <span className={s.fileName}>{props.img.name}</span>
                            }
                        </div>
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
            <div className={s.saveContainer}>
                <BlueButton type={'btn'} handleSubmit={props.handleSubmit} text={'Сохранить и выйти'} />
            </div>
            {/*{*/}
            {/*    props.isChanging &&*/}
            {/*        <button className={'submit'} onClick={() => props.toggleIsChanging(false)}>*/}
            {/*            Закрыть*/}
            {/*        </button>*/}
            {/*}*/}
        </div>
    );
}

export default ChangeForm;
