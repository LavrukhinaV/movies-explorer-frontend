import { NavLink } from 'react-router-dom';
import './MobileMenu.css'
import icon from '../../images/icon.svg'

function MobileMenu(props) {
  return (
    <div className={`mobile-menu ${props.isOpen && "mobile-menu_active"}`}>
    <button className="mobile-menu__btn_close" onClick={props.onClose}/>
      <NavLink exact activeClassName= "mobile-menu__link_active" className="mobile-menu__link" to="/">Главная</NavLink>
      <NavLink activeClassName= "mobile-menu__link_active" className="mobile-menu__link" to="/movies">Фильмы</NavLink>
      <NavLink activeClassName= "mobile-menu__link_active" className="mobile-menu__link" to="/saved-movies">Сохраненные фильмы</NavLink>
      <NavLink activeClassName= "mobile-menu__link_active" className="mobile-menu__link" to="/profile">
        <p className="mobile-menu__link-text">Аккаунт</p>
        <img className="mobile-menu__icon" alt="Иконка открытия меню" src={icon} />
      </NavLink>
    </div>
  )
}

export default MobileMenu;