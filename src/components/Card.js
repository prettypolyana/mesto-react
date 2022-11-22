import React from 'react';

class Card extends React.Component {
  handleClick = () => {
    this.props.onCardClick(this.props.card);
  }

  render() {
    return (
        <li className="elements__card" onClick={this.handleClick}>
            <img className="elements__photo" src={this.props.card.link} alt={this.props.card.name}/>
            <button className="elements__trash elements__trash_shown"></button>
            <div className="elements__info">
                <h2 className="elements__name">{this.props.card.name}</h2>
                <div className="elements__likes">
                    <button className="elements__btn" type="button"></button>
                    <p className="elements__counter">{this.props.card.likes.length}</p>
                </div>
            </div>
        </li>
    );
  }
}

export default Card;