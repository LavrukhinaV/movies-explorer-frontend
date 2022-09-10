import { Route, NavLink } from 'react-router-dom';
import './Header.css'
import logo from '../../images/logo.png';


function Header() {
  return(
    <header className="header">
      <img className="logo" src={logo} alt="Лого сайта"/>
      {/* <Route path='/sign-in'>
        <NavLink to="/sign-up" activeClassName="header__link_none" className="header__link">
          Регистрация
        </NavLink>
      </Route>
      <Route path='/sign-up'>
        <NavLink to="/sign-in" activeClassName="header__link_none" className="header__link">
          Войти
        </NavLink>
      </Route> */}
    </header>
  )
}

export default Header;