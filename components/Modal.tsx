import React, { FC } from 'react';

type ModalProps = {
    show: boolean,
    children: React.ReactNode,
    handleClose: () => void,
}

const Modal: FC<ModalProps> = ({ show, children, handleClose }) => {
    return (
        <div className={`fixed z-50 inset-0 flex items-center justify-center p-4 bg-black bg-opacity-60 ${show ? 'block' : 'hidden'}`}>
            <div className="bg-white rounded-lg p-8">
                {children}
                <button className="mt-4 px-4 py-2 text-white bg-red-500 rounded hover:bg-red-600" onClick={handleClose}>Close</button>
            </div>
        </div>
    );
};

export default Modal;
