import React from 'react';
import Header from './Header';
import Footer from './Footer';
import Main from './Main';
import PopupWithForm from './PopupWithForm';
import EditProfilePopup from './EditProfilePopup';
import EditAvatarPopup from './EditAvatarPopup';
import AddPlacePopup from './AddPlacePopup';
import ImagePopup from './ImagePopup';
import api from '../utils/api';
import {CurrentUserContext} from '../contexts/CurrentUserContext';

class App extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      isEditProfilePopupOpen: false,
      isAddPlacePopupOpen: false,
      isEditAvatarPopupOpen: false,
      selectedCard: null,
      currentUser: null,
      cards: [],
    }
  }

  componentDidMount = () => {
    Promise.all([api.getUserInfo(), api.getInitialCards()])
      .then(([userData, cardsData]) => {
          this.setState({
            currentUser: userData,
            cards: cardsData,
          });
      })
      .catch((err) => {
          console.log(err);
      });
  };

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

  handleCardLike = (card) => {
    const isLiked = card.likes.some(i => i._id === this.state.currentUser._id);
    if (isLiked) {
      api.removeLike(card._id)
        .then((newCard) => {
          const newCards = this.state.cards.map((c) => c._id === card._id ? newCard : c);
          this.setState({
            cards: newCards,
          })
        });
    } else {
      api.addLike(card._id)
        .then((newCard) => {
          const newCards = this.state.cards.map((c) => c._id === card._id ? newCard : c);
          this.setState({
            cards: newCards,
          })
        });
    }
  }

  handleCardDelete = (card) => {
    api.removeCard(card._id)
      .then(() => {
        const newCards = this.state.cards.filter((c) => c._id !== card._id);
        this.setState({
          cards: newCards,
        })
      });
  }

  handleUpdateUser = ({name, about}) => {
    api.setUserInfo(name, about)
      .then((userData) => {
        this.setState({
          currentUser: userData,
        });
        this.closeAllPopups();
      });
  }

  handleUpdateAvatar = ({avatar}) => {
    api.setAvatar(avatar)
      .then((userData) => {
        this.setState({
          currentUser: userData,
        });
        this.closeAllPopups();
      });
  }

  handleAddPlaceSubmit = ({name, link}) => {
    api.addCard(name, link)
      .then((newCard) => {
        this.setState({
          cards: [newCard, ...this.state.cards],
        });
        this.closeAllPopups();
      });
  }

  render() {
    return (
      <div className="page">
        <CurrentUserContext.Provider value={this.state.currentUser}>
          <Header />
            <Main onEditAvatar={this.handleEditAvatarClick} onEditProfile={this.handleEditProfileClick} onAddPlace={this.handleAddPlaceClick} cards={this.state.cards} onCardClick={this.handleCardClick} onCardLike={this.handleCardLike} onCardDelete={this.handleCardDelete}/>
            <Footer />
            <EditProfilePopup isOpen={this.state.isEditProfilePopupOpen} onClose={this.closeAllPopups} onUpdateUser={this.handleUpdateUser}/>
            <AddPlacePopup isOpen={this.state.isAddPlacePopupOpen} onClose={this.closeAllPopups} onAddPlace={this.handleAddPlaceSubmit}/>
            <PopupWithForm name="delete-question" title="Вы уверены?" btnText="Да"/>
            <EditAvatarPopup isOpen={this.state.isEditAvatarPopupOpen} onClose={this.closeAllPopups} onUpdateAvatar={this.handleUpdateAvatar}/>
            <ImagePopup card={this.state.selectedCard} onClose={this.closeAllPopups}/>
        </CurrentUserContext.Provider>
      </div>
    );
  }
}

export default App;
