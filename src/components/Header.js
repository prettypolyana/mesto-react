import React from "react";
import { Route, Link, Switch } from "react-router-dom";
import logoPath from '../images/logo.svg';

class Header extends React.Component {
  render() {
    return (
        <header className="header">
            <img className="header__logo" src={logoPath} alt="Логотип"/>
            <Switch>
              <Route path="/sign-up">
                  <Link to="/sign-in" className="header__link">Войти</Link>
              </Route>
              <Route path="/sign-in">
                  <Link to="/sign-up" className="header__link">Регистрация</Link>
              </Route>
            </Switch>
        </header>
    );
  }
}

export default Header;
