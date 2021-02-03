import React from 'react';
import s from './MuseumCard.module.css'
import {NavLink} from "react-router-dom";
import disableUp from '../../assets/images/disableUp.svg'
import disableDown from '../../assets/images/disableDown.svg'
import downYellow from '../../assets/images/downYellow.svg'
import upGreen from '../../assets/images/upGreen.svg'
import inCard from '../../assets/images/inCard.svg'

const MuseumCard = (props) => {
    return (
        <>
        {
            props.isCardsChanging
            ?
                <div className={s.card}>
                    <div className={s.name}>
                        {props.name}
                    </div>
                    <div className={s.buttons}>
                        {
                            (props.prev !== null && props.isUserMuseumAdmin) &&
                            <button className={`${s.moveBtn} ${s.up}`} onClick={() => props.swapLocations('up', props.id)}>
                                <img src={upGreen} alt="up"/>
                            </button>
                        }
                        {
                            (props.id !== props.last && props.isUserMuseumAdmin) &&
                            <button className={`${s.moveBtn} ${s.down}`} onClick={() => props.swapLocations('down', props.id)}>
                                <img src={downYellow} alt="down"/>
                            </button>
                        }
                    </div>
                </div>
            :
                <NavLink to={props.link} className={s.card}>
                    <div className={s.name}>
                        {props.name}
                    </div>
                    {
                        props.isUserMuseumAdmin
                        ?
                        <div className={s.buttons}>
                            {
                                (props.prev !== null) &&
                                <button className={`${s.moveBtn} ${s.up}`} onClick={() => props.swapLocations('up', props.id)}>
                                    <img src={disableUp} alt="up"/>
                                </button>
                            }
                            {
                                (props.id !== props.last) &&
                                <button className={`${s.moveBtn} ${s.down}`} onClick={() => props.swapLocations('down', props.id)}>
                                    <img src={disableDown} alt="down"/>
                                </button>
                            }
                            {
                                (props.prev === null && props.id === props.last) &&
                                <div className={s.inCard}>
                                    <img src={inCard} alt="inCard"/>
                                </div>
                            }
                        </div>
                        :
                            <div className={s.inCard}>
                                <img src={inCard} alt="inCard"/>
                            </div>
                    }
                </NavLink>
        }
        </>
    );
}

export default MuseumCard;
