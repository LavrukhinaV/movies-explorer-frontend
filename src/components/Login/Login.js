import { useForm } from "react-hook-form";
import './Login.css'
import logo from '../../images/logo.png';

function Login() {
  const { 
    register, handleSubmit, formState: { errors, isValid } 
  } = useForm({
    mode: "onBlur"
  });

  const onSubmit = data => console.log(data);

  return (
    <div className="form">
      <form className="form__container" onSubmit={handleSubmit(onSubmit)}>
        <img className="logo form__logo" src={logo} alt="Лого сайта"/>
        <h1 className="form__header">Рады видеть!</h1>
        <label className='form__label'>E-mail</label>
        <input  
          {...register('email', {
            required: "Поле обязательно к заполнению.",
            pattern: {
              value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
              message: "Поле должно содержать email"
            }
          })}
            id="email" 
            className="form__input" type="text"
        />
        <span className="form__error-label">
          {errors?.email && <p className="form__error-text">{errors?.email?.message || "Что-то пошло не так..."}</p>}
        </span>
        <label className='form__label'>Пароль</label>
        <input
          {...register('password', {
            required: "Поле обязательно к заполнению."
          })}
          id="password" className="form__input" type="password" autoComplete="on"
        />
        <span className="form__error-label">
          {errors?.password && <p className="form__error-text">{errors?.password?.message || "Что-то пошло не так..."}</p>}
        </span>
        <button type="submit" className="form__button" disabled={!isValid}>Войти</button>
      </form>
      <div className="form__question">
        <p className="form__text">Ещё не зарегистрированы?</p>
        <button className="form__link">Регистрация</button>
      </div>
   </div>
   )
 }
 
 export default Login;