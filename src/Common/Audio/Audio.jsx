import React from 'react';
import s from './Audio.module.css'
import H5AudioPlayer, { RHAP_UI } from "react-h5-audio-player";
import 'react-h5-audio-player/lib/styles.css';
import play from './../../assets/images/play-button-2.svg'

const Audio = (props) => {



    return (
        <>
            <H5AudioPlayer autoPlay={false}
                           className={s.audio}
                           volume={0.1}
                           src={props.audio}
                           showJumpControls={false}
                           customProgressBarSection={[
                               RHAP_UI.MAIN_CONTROLS,
                               RHAP_UI.CURRENT_TIME, RHAP_UI.PROGRESS_BAR, RHAP_UI.DURATION
                           ]}
                           customControlsSection={[]}
            />
        </>
    );
}

export default Audio;
