import './Login.css'
import logo from '../../images/logo.png';

function Login() {
  return (
    <div className="form">
      <form className="form__container">
        <img className="logo form__logo" src={logo} alt="Лого сайта"/>
        <h1 className="form__header">Рады видеть!</h1>
        <label className='form__label'>E-mail</label>
        <input id="email" required name="email"  className="form__input" type="text"/>
        <label className='form__label'>Пароль</label>
        <input id="password" required name="password" className="form__input" type="password" autoComplete="on"/>
        <button type="submit" className="form__button">Войти</button>
      </form>
      <div className="form__question">
        <p className="form__text">Ещё не зарегистрированы?</p>
        <button className="form__link">Регистрация</button>
      </div>
   </div>
   )
 }
 
 export default Login;