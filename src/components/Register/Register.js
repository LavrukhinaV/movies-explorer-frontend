import { useState, useEffect } from 'react';
import { NavLink } from 'react-router-dom';
import {withRouter} from 'react-router';
import { useForm } from "react-hook-form";
import './Register.css'
import logo from '../../images/logo.svg';

function Register(props) {
  const { 
    register, handleSubmit, formState: { errors, isValid }, watch
  } = useForm({
    mode: "onChange"
  });

  const [formParams, setFormParams] = useState({
    name: '',
    email: '',
    password: '',
  });

  const watchName = watch('name')
  const watchEmail = watch('email')
  const watchPassword = watch('password')

  useEffect(() => {
    setFormParams({
      name: watchName,
      email: watchEmail,
      password: watchPassword,
    })
  }, [watchName, watchEmail, watchPassword])

  const onSubmit = () => {
      let { name, email, password } = formParams;
      props.handleRegister({ name, email, password })
  }

  return (
    <div className="form">
      <form className="form__container" onSubmit={handleSubmit(onSubmit)}>
        <NavLink className="logo form__logo" exact to="/">
          <img  src={logo} alt="Лого сайта"/>
        </NavLink>
        <h1 className="form__header">Добро пожаловать!</h1>
        <label className='form__label'>Имя</label>
        <input 
          {...register('name', {
            required: "Поле обязательно к заполнению.",
            minLength: {
              value: 2,
              message: "Минимум 2 символов."
            },
            maxLength: {
              value: 30,
              message: "Максимум 30 символов."
            }
          })} 
          id="name"
          className="form__input"
          type="text" 
        />
        <span className="form__error-label">
          {errors?.name && <p className="form__error-text">{errors?.name?.message || "Что-то пошло не так..."}</p>}
        </span>
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
          className="form__input"
          type="text" 
        />
        <span className="form__error-label">
          {errors?.email && <p className="form__error-text">{errors?.email?.message || "Что-то пошло не так..."}</p>}
        </span>
        <label className='form__label'>Пароль</label>
        <input
          {...register('password', {
            required: "Поле обязательно к заполнению."
          })}
          id="password"
          className="form__input"
          type="password"
          autoComplete="on" 
        />
        <span className="form__error-label">
          {errors?.password && <p className="form__error-text">{errors?.password?.message || "Что-то пошло не так..."}</p>}
        </span>
        <button type="submit" className="form__button" disabled={!isValid}>Зарегистрироваться</button>
      </form>
      <div className="form__question">
        <p className="form__text">Уже зарегистрированы?</p>
        <NavLink to="/signin" className="form__link">Войти</NavLink>
      </div>
   </div>
   )
 }
 
 export default withRouter(Register);