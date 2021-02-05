import React from 'react';
import s from './Artifact.module.css'
import Audio from "../../../Common/Audio/Audio";
import ChangeForm from "../../../Common/ChangeForm/ChangeForm";
import foreign from "../../../assets/images/foreign.svg";
import TopContainer from "../../../Common/Top/TopContainer";
import edit from "../../../assets/images/edit.svg";
import prev from "../../../assets/images/left-chevron.svg";
import BlueButton from "../../../Common/BlueButton/BlueButton";
import TransparentButton from "../../../Common/TransparentButton/TransparentButton";
import RedTransparentBtn from "../../../Common/RedTransparentBtn/RedTransparentBtn";
import RelocateContainer from "../Relocate/RelocateContainer";

const Artifact = (props) => {

    return (
        <div className={'outer'}>
            <div className={'container'}>
                <div className={s.artifactContainer}>
                    {
                        props.isRelocate
                        ? <RelocateContainer isRelocate={props.isRelocate} toggleRelocate={props.toggleRelocate} />
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
                                                    <img src={prev} alt="back"/>
                                                </button>
                                                <h2 className={s.name}>
                                                    {props.name}
                                                </h2>
                                                {
                                                    !props.isChanging
                                                    &&
                                                    <div onClick={() => props.toggleIsChanging(!props.isChanging)} >
                                                        <img src={edit} alt="edit"/>
                                                    </div>
                                                }
                                            </div>


                                            <div className={s.artifact}>
                                                <div className={s.imgContainer}>
                                                    <img src={props.main_img} alt="artifact"/>
                                                </div>

                                                <div className={s.info}>
                                                    <h3 className={s.title}>
                                                        Аудиогид
                                                    </h3>
                                                    <Audio audio={props.main_audio}/>

                                                    <div className={s.descriptionContainer}>
                                                        <h3 className={s.title}>
                                                            Описание
                                                        </h3>
                                                        <div className={s.description}>
                                                            {props.description}
                                                        </div>
                                                    </div>
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
                                                                <TransparentButton text={'Переместить экспонат'} type={'btn'} handleSubmit={props.toggleRelocate}  />
                                                            </>
                                                            :
                                                            <BlueButton text={'Перейти в карту зала'} type={'link'} to={`/halls/${props.artifactData.hall.id}/artifacts`} />
                                                    }

                                                </div>
                                            </div>
                                        </>
                                }
                            </>
                    }
                </div>
            </div>
        </div>

    );
}

export default Artifact;

// { //Находится ли данный товар в корзине
//     props.isUserMuseumAdmin && (
//
// }
//
// {
//     props.isUserMuseumAdmin &&
//     <NavLink className={s.goInside} to={`/m-admin/relocate/${props.location_id}/${props.hall_id}/${l.id}`}>Переместить экспонат</NavLink>
// }

//Находится ли данный товар в корзине
// props.isUserMuseumAdmin && (
//     props.print.some(item => item.id === l.id) ?
//         <button className={s.inCart} onClick={() => props.deleteOneArtifact(l.id)}>
//             Удалить из печати
//         </button>
//
//         :   <button className={s.inCart} onClick={() => props.addArtifactToPrint(l)}
//         >
//             Добавить к печати
//         </button>)
// }
