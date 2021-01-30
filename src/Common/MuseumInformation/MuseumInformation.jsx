import React from 'react';
import s from './MuseumInformation.module.css'
import lefArrow from './../../assets/images/leftarrow_121320.svg'
import edit from './../../assets/images/edit.svg'

const MuseumInformation = (props) => {
    return (
        <>
            {
                props.isUserMuseumAdmin
                ?
                    <div className={s.adminTop}>
                        <h2 className={s.name}>{props.name}</h2>
                        <div onClick={() => props.toggleIsChanging(true)} className={s.change}>
                            <img src={edit} alt=""/>
                        </div>
                    </div>
                :
                    <div className={s.userTop}>
                        <h2 className={s.name}>{props.name}</h2>
                        <button><img src={lefArrow} alt="lefArrow"/></button>
                    </div>
            }

            <div className={s.imgContainer}>
                <img className={s.img} src={props.main_img} alt="section"/>
            </div>
            <div className={s.descriptionTitle}>
                Описание:
            </div>
            <div className={s.description}>
                {props.description}
            </div>
        </>
    );
}

export default MuseumInformation;
