import React, {useEffect} from 'react';

function PopupWithForm({name, title, btnText, children, isOpen, onClose, onSubmit}) {
    useEffect(() => {
        function handleEscClose(event) {
            if (event.key === 'Escape') {
                onClose();
            }
        }

        if (isOpen) {
            document.addEventListener('keydown', handleEscClose);
        }

        return () => {
            document.removeEventListener('keydown', handleEscClose);
        }
    }, [isOpen, onClose]);

    function handlePopupOverlayClick(event) {
        if (event.target.classList.contains('popup') || event.target.classList.contains('popup__close')) {
            onClose();
        }
    }

    return (
        <div className={`popup popup_view_${name} ${isOpen ? 'popup_opened' : ''}`} onClick={handlePopupOverlayClick}>
            <div className="popup__container">
                <button className="popup__close popup__close-profile" type="button" onClick={onClose}></button>
                <form className="popup__content popup__content-profile" noValidate name={name} onSubmit={onSubmit}>
                    <h2 className="popup__title">{title}</h2>
                    {children}
                    <button className="popup__btn" type="submit">{btnText}</button>
                </form>
            </div>
        </div>
    );
}

export default PopupWithForm;
