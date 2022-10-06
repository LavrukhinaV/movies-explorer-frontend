import { useForm } from "react-hook-form";
import {useEffect, useState, useContext} from 'react';
import './Profile.css';
import {CurrentUserContext} from '../../contexts/CurrentUserContext'

function Profile(props) {

  const currentUser = useContext(CurrentUserContext);
  const [name, setName] = useState(currentUser.name)
  const [email, setEmail] = useState(currentUser.email)

  useEffect(() => {
    setName(currentUser.name || '');
    setEmail(currentUser.email || '');
  }, [currentUser]);
  
  const { 
    watch, register, handleSubmit, formState: { errors, isValid }
  } = useForm({
    mode: "onChange"
  });

  const onSubmit = (data) => {
    const name = data.name;
    const email = data.email
      props.onUpdateUser({
      name,
      email,
    })
  }

  const watchName = watch('name')
  const watchEmail = watch('email')

  const isInputsValidaty = (isValid && (currentUser.name !== watchName || currentUser.email !== watchEmail));

  return (
    <div className="form">
      <form className="form__container form__container_type_profile" onSubmit={handleSubmit(onSubmit)}>
        <h1 className="form__header form__header_type_profile">Привет, {currentUser.name}!</h1>
        <label className="form__field">
          <span className='form__placeholder form__placeholder_type_profile'>Имя</span>
          <input
            {...register('name', {
              required: "Поле обязательно к заполнению.",
              minLength: {
                value: 2,
                message: "Минимум 2 символов.",
              },
              maxLength: {
                value: 30,
                message: "Максимум 30 символов."
              }
            })}
            id="name" className="form__input form__input_type_profile" type="text" defaultValue={name}
          />
        </label>
        <span className="form__error-label">
            {errors?.name && <p className="form__error-text">{errors?.name?.message || "Что-то пошло не так..."}</p>}
          </span>
        <label className="form__field">
          <span className='form__placeholder form__placeholder_type_profile'>E-mail</span>
          <input
            {...register('email', {
              required: "Поле обязательно к заполнению.",
              pattern: {
                value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                message: "Поле должно содержать email"
              }
            })}
            id="email" className="form__input form__input_type_profile" type="text" defaultValue={email}
          />
        </label>
        <span className="form__error-label">
          {errors?.email && <p className="form__error-text">{errors?.email?.message || "Что-то пошло не так..."}</p>}
        </span>
        <button type="submit" className="form__button form__button_type_edit-profile" disabled={!isInputsValidaty ? true : false}>Редактировать</button>
      </form>
      <button type="button" className="form__button_type_exit" onClick={props.handleSignOut}>Выйти из аккаунта</button>
   </div>
   )
 }
 
 export default Profile;