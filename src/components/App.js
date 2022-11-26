import React from 'react';
import Header from './Header';
import Footer from './Footer';
import Main from './Main';
import PopupWithForm from './PopupWithForm';
import ImagePopup from './ImagePopup';

class App extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      isEditProfilePopupOpen: false,
      isAddPlacePopupOpen: false,
      isEditAvatarPopupOpen: false,
      selectedCard: null,
    }
  }

  handleEditAvatarClick = () => {
    this.setState({isEditAvatarPopupOpen: true});
  };

  handleEditProfileClick = () => {
    this.setState({isEditProfilePopupOpen: true});
  };

  handleAddPlaceClick = () => {
    this.setState({isAddPlacePopupOpen: true});
  }

  closeAllPopups = () => {
    this.setState({
      isEditProfilePopupOpen: false,
      isAddPlacePopupOpen: false,
      isEditAvatarPopupOpen: false,
      selectedCard: null,
    });
  }

  handleCardClick = (card) => {
    this.setState({
      selectedCard: card,
    });
  }

  render() {
    return (
      <div className="page">
          <Header />
          <Main onEditAvatar={this.handleEditAvatarClick} onEditProfile={this.handleEditProfileClick} onAddPlace={this.handleAddPlaceClick} onCardClick={this.handleCardClick} />
          <Footer />
          <PopupWithForm name="profile" title="Редактировать профиль" btnText="Сохранить" isOpen={this.state.isEditProfilePopupOpen} onClose={this.closeAllPopups}>
            <fieldset className="popup__input-field">
                <input className="popup__input popup__name" type="text" name="name" placeholder="Введите имя" minLength="2" maxLength="40" required />
                <span id="name-error" className="popup__input-error"></span>
            </fieldset>
            <fieldset className="popup__input-field">
                <input className="popup__input popup__job" type="text" name="job" placeholder="Введите вид деятельности" minLength="2" maxLength="200" required />
                <span id="job-error" className="popup__input-error"></span>
            </fieldset>
          </PopupWithForm>
          <PopupWithForm name="add-card" title="Новое место" btnText="Создать" isOpen={this.state.isAddPlacePopupOpen} onClose={this.closeAllPopups}>
            <fieldset className="popup__input-field">
                <input className="popup__input popup__card-name" type="text" name="card_name" placeholder="Название" minLength="2" maxLength="30" required />
                <span id="card_name-error" className="popup__input-error"></span>
            </fieldset>
            <fieldset className="popup__input-field">
                <input className="popup__input popup__link" type="url" name="card_link" placeholder="Ссылка на картинку" required />
                <span id="card_link-error" className="popup__input-error"></span>
            </fieldset>
          </PopupWithForm>
          <PopupWithForm name="delete-question" title="Вы уверены?" btnText="Да"/>
          <PopupWithForm name="edit-avatar" title="Обновить аватар" btnText="Сохранить" isOpen={this.state.isEditAvatarPopupOpen} onClose={this.closeAllPopups}>
            <fieldset className="popup__input-field">
                <input className="popup__input popup__avatar-link" type="url" name="avatar_link" placeholder="Ссылка на картинку" required />
                <span id="avatar_link-error" className="popup__input-error"></span>
            </fieldset>
          </PopupWithForm>
          <ImagePopup card={this.state.selectedCard} onClose={this.closeAllPopups}/>
      </div>
    );
  }
}

export default App;
