import React from 'react';
import s from './PrintList.module.css'
import TopContainer from "../../../Common/Top/TopContainer";
import BlueButton from "../../../Common/BlueButton/BlueButton";
import prev from "../../../assets/images/left-chevron.svg";
import RedTransparentBtn from "../../../Common/RedTransparentBtn/RedTransparentBtn";
import PrintItem from "./PrintItem/PrintItem";

const PrintList = (props) => {
    return (
        <div className={'outer'}>
            <div className={'container'}>
                <div className={s.print}>
                    <TopContainer isUserMuseumAdmin={props.isUserMuseumAdmin} />

                    <div className={s.topContainer}>
                        <h2 className={'itemsTitle'}>
                            Экспонаты для печати
                        </h2>
                        <button onClick={() => props.history.goBack()} className={'backBtn'}>
                            <img src={prev} alt="back"/>
                        </button>
                    </div>

                    {
                        props.print &&
                        <div className={s.buttons}>
                            {/*onClick={() => props.printArtifacts(props.print, 'large')}*/}
                            <button onClick={props.handleSubmit} className={props.name === 'large' ? `${s.active}` : `${s.button}`} name={'large'}>Большой</button>
                            <button onClick={props.handleSubmit} className={props.name === 'medium' ? `${s.active}` : `${s.button}`} name={'medium'}>Средний</button>
                            <button onClick={props.handleSubmit} className={props.name === 'tiny' ? `${s.active}` : `${s.button}`} name={'tiny'}>Маленький</button>
                            {/*<button onClick={() => props.removeArtifactsToPrint()}>Удалить всё</button>*/}
                            {/*Кнопка удалить всё будет внизу*/}
                        </div>

                    }

                    {
                        // props.pdf !== '' &&
                        //     <div>
                        //         <a target={'_blank'} rel={'noreferrer noopener'} href={props.pdf}>Открыть pdf файл с qr-кодами артефактов</a>
                        //     </div>
                    }
                    <div className={s.itemsContainer}>
                        {
                            props.print &&
                            (props.print.length > 0) ?
                                props.print.map(p => {
                                    return (
                                        <PrintItem key={p.id} {...p} deleteOneArtifact={props.deleteOneArtifact} />
                                    )
                                })
                                :
                                <div className={'emptyLocations'}>
                                    Добавьте экспонаты для печати
                                </div>
                        }
                    </div>

                    <div className={s.buttonsContainer}>
                        <BlueButton type={'btn'} handleSubmit={props.printArtifacts} text={'Распечатать экспонаты'} />
                        <RedTransparentBtn type={'btn'} handleSubmit={props.removeArtifactsToPrint} text={'Удалить всё'} />
                    </div>
                </div>
            </div>
        </div>
    );
}

export default PrintList;
