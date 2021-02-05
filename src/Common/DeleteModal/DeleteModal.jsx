import React from 'react';
import Modal from "react-png-modal";

const DeleteModal = (props) => {
    return (
        <Modal
            center
            className={'CustomModal'}
            closeModal={() => props.toggleOpenModal(false)}
            open={props.isModalOpen}>
            {
                <>
                    <div className={'titleModal'}>
                        Подтвердить удаление
                    </div>
                    <button onClick={() => props.deleteMuseum()} className={'submitModal'}>
                        Подтвердить
                    </button>
                </>
            }
        </Modal>
    );
}

export default DeleteModal;
