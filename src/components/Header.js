import React from 'react';
import logoPath from '../images/logo.svg';

class Header extends React.Component {
  render() {
    return (
        <header className="header">
            <img className="header__logo" src={logoPath} alt="Логотип"/>
        </header>
    );
  }
}

export default Header;
