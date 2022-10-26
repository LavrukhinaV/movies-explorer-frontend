import { NavLink, useRouteMatch } from 'react-router-dom';
import './Header.css'
import MobileMenu from '../MobileMenu/MobileMenu'
import logo from '../../images/logo.svg';
import icon from '../../images/icon.svg'

function Header(props) {
  const { path } = useRouteMatch();
  const isMain = path === '/';
  const headerClassName = (
    `header  ${isMain ? 'header_background_blue' : ''}`
  );

  return (
    <header className={headerClassName}>
      <NavLink exact to="/">
        <img className="logo" src={logo} alt="Лого сайта"/>
      </NavLink>
      {props.loggedIn ? 
          <div className="header__container">
          <NavLink to="/movies" activeClassName= "header__link_active" className="header__link header__link_type_movies header__link_inactive">
            Фильмы
          </NavLink>
          <NavLink to="/saved-movies" activeClassName= "header__link_active" className="header__link header__link_type_saved-movies header__link_inactive">
            Сохраненные фильмы
          </NavLink>
          <NavLink to="/profile" activeClassName= "header__link_active" className="header__link header__link_type_profile header__link_inactive">
            <p className="link__text">Аккаунт</p>
            <img className="header__icon" alt="Логотип" src={icon} />
          </NavLink>
          <button type="menu" className="header__menu-btn_open" onClick={props.onHeaderMenu}/>
          <MobileMenu isOpen={props.isOpen} onClose={props.onClose}/>
        </div>

    :
    <div className="header__container">
    <NavLink to="/signup" className="header__link header__link_type_signup">
      Регистрация
    </NavLink>
    <NavLink to="/signin" className="header__link header__link_type_signin">
      Войти
    </NavLink>
  </div> 
    }
    </header>
  )
}

export default Header;