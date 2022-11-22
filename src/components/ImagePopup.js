import React from 'react';

  function ImagePopup({card, onClose}) {

    React.useEffect(() => {
        function handleEscClose(event) {
            if (event.key === 'Escape') {
                onClose();
            }
        }

        if (card) {
            document.addEventListener('keydown', handleEscClose);
        }

        return () => {
            document.removeEventListener('keydown', handleEscClose);
        }
    }, [card, onClose]);

    function handlePopupOverlayClick(event) {
        if (event.target.classList.contains('popup') || event.target.classList.contains('popup__close')) {
            onClose();
        }
    }

    return (
      <div className={`popup popup_view_show-image ${card ? 'popup_opened' : ''}`} onClick={handlePopupOverlayClick}>
          <div className="popup__container popup__container_image">
              <button className="popup__close popup__close-image" type="button"></button>
              <img className="popup__image" src={card ? card.link : ''} alt={card ? card.name : ''}/>
              <div className="popup__desc">{card ? card.name : ''}</div>
          </div>
      </div>
    );
}

export default ImagePopup;
