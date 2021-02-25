import React from 'react';
import s from './Artifact.module.css'
import Audio from "../../../Common/Audio/Audio";
import ChangeForm from "../../../Common/ChangeForm/ChangeForm";
import foreign from "../../../assets/images/foreign.svg";
import TopContainer from "../../../Common/Top/TopContainer";
import edit from "../../../assets/images/edit.svg";
import prev from "../../../assets/images/left-chevron.svg";
import BlueButton from "../../../Common/BlueButton/BlueButton";
import RedTransparentBtn from "../../../Common/RedTransparentBtn/RedTransparentBtn";
import RelocateContainer from "../Relocate/RelocateContainer";
import DeleteModal from "../../../Common/DeleteModal/DeleteModal";
import desktop_arrow from "../../../assets/images/arrow_back_blue.svg";
import Image from "../../../Common/Image/Image";

const Artifact = (props) => {
    return (
        <div className={'outer'}>
            <div className={'container'}>
                <div className={s.artifactContainer}>
                    {
                        props.isRelocate
                        ? <RelocateContainer isRelocate={props.isRelocate} toggleRelocate={props.toggleRelocate}
                                             setIsRelocated={props.setIsRelocated} />
                        :
                            <>
                                <TopContainer isUserMuseumAdmin={props.isUserMuseumAdmin} />
                                {
                                    props.isChanging
                                        ?
                                        <>
                                            <ChangeForm isChangingArtifact={true} {...props} text={'Изменение экспоната'} isItemArtifact={true} //Является ли создаваемы объект артефактом
                                            />
                                        </>
                                        :
                                        <>
                                            <div className={s.topContainer}>
                                                <button onClick={() => props.history.goBack()} className={'adminBackBtn'}>
                                                    <img className={'prev'} src={prev} alt="back"/>
                                                    <img className={'arrow'} src={desktop_arrow} alt="back"/>
                                                </button>
                                                <h2 className={s.name}>
                                                    {props.name}
                                                </h2>
                                                {
                                                    props.isUserMuseumAdmin
                                                    ?
                                                        <>
                                                            <div className={s.edit} onClick={() => props.toggleIsChanging(!props.isChanging)} >
                                                                <img src={edit} alt="edit"/>
                                                            </div>
                                                            <div className={s.empty}>

                                                            </div>
                                                        </>

                                                    :
                                                        <div className={s.userEmpty}></div>
                                                }

                                            </div>


                                            <div className={s.artifact}>
                                                <div className={s.imgContainer}>
                                                    {/*<img src={props.main_img} alt="artifact"/>*/}
                                                    {
                                                        (props.images !== null &&(
                                                            props.img_1 !== null ||
                                                            props.img_2 !== null ||
                                                            props.img_3 !== null ||
                                                            props.img_4 !== null ||
                                                            props.img_5 !== null)) &&
                                                        <Image images={props.images} />
                                                    }
                                                </div>

                                                <div className={s.info}>
                                                    <h3 className={s.title}>
                                                        Аудиогид(ы)
                                                    </h3>
                                                    {
                                                        props.audio_1 !== null &&
                                                        <div className={s.audio}>
                                                            <Audio audio={props.audio_1}/>
                                                        </div>
                                                    }
                                                    {
                                                        props.audio_2 !== null &&
                                                        <div className={s.audio}>
                                                            <Audio audio={props.audio_2}/>
                                                        </div>
                                                    }
                                                    {
                                                        props.audio_3 !== null &&
                                                        <div className={s.audio}>
                                                            <Audio audio={props.audio_3}/>
                                                        </div>
                                                    }
                                                    {
                                                        props.audio_4 !== null &&
                                                        <div className={s.audio}>
                                                            <Audio audio={props.audio_4}/>
                                                        </div>
                                                    }
                                                    {
                                                        props.audio_5 !== null &&
                                                        <div className={s.audio}>
                                                            <Audio audio={props.audio_5}/>
                                                        </div>
                                                    }

                                                    <div className={s.descriptionContainer}>
                                                        <h3 className={s.title}>
                                                            Описание
                                                        </h3>
                                                        <div className={s.description}>
                                                            {props.description}
                                                        </div>
                                                    </div>
                                                    <div className={s.descriptionContainer}>
                                                        <h3 className={s.title}>
                                                            Видеофрагменты
                                                        </h3>
                                                        {
                                                            props.video !== '' &&
                                                            <div>
                                                                <a href={props.video} target={'_blank'} rel={"noreferrer noopener"} className={`${s.transparentButton} ${s.button}`}>
                                                                    <div>
                                                                        Смотреть видео
                                                                    </div>
                                                                    <img src={foreign} alt="link"/>
                                                                </a>
                                                            </div>
                                                        }
                                                    </div>

                                                    {
                                                        props.isRelocated &&
                                                            <div className={'form__right'}>
                                                                Экспонат успешно перемещен
                                                            </div>
                                                    }

                                                    {
                                                        props.isUserMuseumAdmin
                                                            ?
                                                            <>
                                                                {
                                                                    props.print.some(item => item.id === props.artifactData.id)
                                                                        ?
                                                                        <RedTransparentBtn type={'withProps'} text={'Удалить из печати'} handleSubmit={props.deleteOneArtifact} data={props.artifactData.id} />
                                                                        :
                                                                        <BlueButton text={'Добавить к печати'} type={'withProps'} handleSubmit={props.addArtifactToPrint} data={props.artifactData} />
                                                                }
                                                                <BlueButton text={'Переместить экспонат'} type={'btn'} handleSubmit={props.toggleRelocate}  />
                                                                <div className={s.desktopEdit}>
                                                                    <BlueButton text={'Редактировать'} type={'withProps'} data={!props.isChanging} handleSubmit={props.toggleIsChanging} />
                                                                </div>
                                                            </>
                                                            :
                                                            <>
                                                                <BlueButton text={'Перейти к карте зала'} type={'link'} link={`/halls/${props.artifactData.hall.id}/artifacts`} />
                                                            </>
                                                    }
                                                </div>
                                            </div>
                                        </>
                                }
                            </>
                    }
                    <DeleteModal isModalOpen={props.isModalOpen} toggleOpenModal={props.toggleOpenModal} deleteMuseum={props.deleteArtifact} />
                </div>
            </div>
        </div>

    );
}

export default Artifact;
