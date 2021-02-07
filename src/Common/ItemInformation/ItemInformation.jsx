import React from 'react';
import s from './ItemInformation.module.css'
import prev from "../../assets/images/left-chevron.svg";
import checked from "../../assets/images/checked.svg";
import edit from "../../assets/images/edit.svg";
import BackBtn from "../BackBtn/BackBtn";

const ItemInformation = (props) => {
    return (
       <>
           {
               props.isUserMuseumAdmin
                   ?
                   <>

                       <div className={s.topContainer}>
                           <button onClick={() => props.history.goBack()} className={'adminBackBtn'}>
                               <img src={prev} alt="back"/>
                           </button>
                           {
                               props.isChanging
                                   ?
                                   <div>
                                       <input type="text" autoFocus={true} className={s.nameInput} value={props.name} onKeyUp={props.handleFindKey} name={'name'} onFocus={props.handleFocus} onChange={props.handleChange}/>
                                       {
                                           props.isEmptyInputs &&
                                           <div className={s.error}>
                                                Название не может быть пустым
                                           </div>
                                       }
                                   </div>
                                   :
                                   <div className={s.name}>
                                       {props.name}
                                   </div>
                           }
                           {
                               props.isChanging
                                   ?
                                   <div onClick={() => props.handleSubmit()}>
                                       <img width={20} height={20} src={checked} alt="edit"/>
                                   </div>
                                   :
                                   <div onClick={() => props.toggleIsChanging(!props.isChanging)} >
                                       <img src={edit} alt="edit"/>
                                   </div>
                           }
                       </div>

                       <div className={'titleContainer'}>
                           <h2 className={'itemsTitle'}>
                               {props.text}
                           </h2>
                           {
                               props.isUserMuseumAdmin &&(
                                   props.isCardsChanging
                                       ?
                                       <button onClick={() => {props.toggleIsCardsChanging(false)}} className={'cards_changing_button'}>
                                           Сохранить
                                       </button>
                                       :
                                       <button onClick={() => props.toggleIsCardsChanging(true)} className={'cards_changing_button'}>
                                           Изменить порядок
                                       </button>)
                           }
                       </div>
                   </>
                   :
                   <>
                       <div className={'userTitleContainer'}>
                           <h2 className={'pageTitle'}>
                               {props.locationName}
                           </h2>
                           <BackBtn history={props.history} />
                       </div>
                   </>
           }
       </>
    );
}

export default ItemInformation;
