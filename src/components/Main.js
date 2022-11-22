import React from 'react';
import api from '../utils/api';
import Card from './Card';

class Main extends React.Component {
  state = {
    userName: '',
    userDescription: '',
    userAvatar: '',
    cards: [],
  }

  componentDidMount() {
    Promise.all([api.getUserInfo(), api.getInitialCards()])
      .then(([userData, cardsData]) => {
          this.setState({
            userName: userData.name,
            userDescription: userData.about,
            userAvatar: userData.avatar,
            cards: cardsData,
          });
      })
      .catch((err) => {
          console.log(err);
      });
  }

  render() {
    return (
      <main className="content page__content">
          <section className="profile">
              <div className="profile__person">
                  <div className="profile__overlay" onClick={this.props.onEditAvatar}>
                      <img className="profile__avatar" alt="Фото профиля" src={this.state.userAvatar}/>
                  </div>
                  <div className="profile__info">
                      <div className="profile__title">
                          <h1 className="profile__name">{this.state.userName}</h1>
                          <button className="profile__btn" type="button" onClick={this.props.onEditProfile}></button>
                      </div>
                      <p className="profile__subtitle">{this.state.userDescription}</p>
                  </div>
              </div>
              <button className="profile__btn-plus" type="button" onClick={this.props.onAddPlace}></button>
          </section>
          <section className="elements content__elements">
              <ul className="elements__list">
                {this.state.cards.map((card) => (
                    <Card card={card} onCardClick={this.props.onCardClick} key={card._id}/>
                ))}
              </ul>
          </section>
      </main>
    );
  }
}

export default Main;
