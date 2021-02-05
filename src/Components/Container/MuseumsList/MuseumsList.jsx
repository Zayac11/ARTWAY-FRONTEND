import React from 'react';
import s from './MuseumsList.module.css'
import MuseumCard from "../../../Common/MuseumCard/MuseumCard";
import TopContainer from "../../../Common/Top/TopContainer";
import BlueButton from "../../../Common/BlueButton/BlueButton";

const MuseumsList = (props) => {

    return (
        <div className={'outer'}>
            <div className={'container'}>
                <div className={s.list}>

                    <TopContainer isUserServiceAdmin={true} />

                    <div className={'topContainer'}>
                        <h2 className={s.title}>
                            Список музеев
                        </h2>
                    </div>
                    <div className={s.museums}>
                        {
                            props.museums &&
                            props.museums.length > 0 ?

                                props.museums.map(m => {
                                    return(
                                        <div className={s.item}>
                                            <MuseumCard link={`/s-admin/${m.id}`} key={m.id} name={m.name} />
                                        </div>


                                    )
                                })
                                :
                                <div className={'emptyLocations'}>
                                    Музеев не найдено
                                </div>
                        }
                    </div>


                    <div className={'buttonContainer'}>
                        <BlueButton type={'link'} link={'/s-admin/create_museum'} text={'Создать музей'} />
                    </div>

                </div>
            </div>
        </div>
    );
}

export default MuseumsList;
