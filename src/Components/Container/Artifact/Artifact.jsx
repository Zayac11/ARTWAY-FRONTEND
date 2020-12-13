import React from 'react';
import s from './Artifact.module.css'
import './../../../Common/style.css'
import prev from './../../../assets/images/next.svg'
import Audio from "../../../Common/Audio/Audio";

const Artifact = ({artifactData, ...props}) => {
    return (
        <div className={s.artifactContainer}>
            <div className='blackTop'>
                <div className={s.top}>
                    <button onClick={() => props.history.goBack()} className={s.backBtn}>
                        <img src={prev} alt="back"/>
                    </button>
                    <div className={s.name}>
                        {artifactData.name}
                    </div>
                    <div></div>
                </div>
            </div>
            <div className={s.artifact}>
                <div className={s.imgContainer}>
                    <img src={artifactData.img} alt="artifact"/>
                </div>

                <div className={s.info}>
                    {/*<div className={s.audio}>*/}
                    {/*    Audio will be here...*/}
                    {/*</div>*/}

                    <Audio audio={artifactData.audio} />

                    <div className={s.descriptionContainer}>
                        <div className={s.title}>
                            Описание
                        </div>
                        <div className={s.description}>
                            {artifactData.description}
                        </div>
                    </div>
                </div>
            </div>
        </div>
);
}

export default Artifact;
