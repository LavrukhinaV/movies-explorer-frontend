import { useForm } from "react-hook-form";
import './Profile.css';

function Profile() {
  const { 
    register, handleSubmit, formState: { errors, isValid } 
  } = useForm({
    mode: "onBlur"
  });

  const onSubmit = data => console.log(data);

  return (
    <div className="form">
      <form className="form__container form__container_type_profile" onSubmit={handleSubmit(onSubmit)}>
        <h1 className="form__header form__header_type_profile">Привет, Виталий!</h1>
        <label class="form__field">
          <span className='form__placeholder form__placeholder_type_profile'>Имя</span>
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
            id="name" className="form__input form__input_type_profile" type="text"
          />
        </label>
        <span className="form__error-label">
            {errors?.name && <p className="form__error-text">{errors?.name?.message || "Что-то пошло не так..."}</p>}
          </span>
        <label class="form__field">
          <span className='form__placeholder form__placeholder_type_profile'>E-mail</span>
          <input
            {...register('email', {
              required: "Поле обязательно к заполнению.",
              pattern: {
                value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                message: "Поле должно содержать email"
              }
            })}
            id="email" className="form__input form__input_type_profile" type="text"
          />
        </label>
        <span className="form__error-label">
          {errors?.email && <p className="form__error-text">{errors?.email?.message || "Что-то пошло не так..."}</p>}
        </span>
        <button type="submit" className="form__button form__button_type_edit-profile" disabled={!isValid}>Редактировать</button>
      </form>
      <button type="submit" className="form__button_type_exit">Выйти из аккаунта</button>
   </div>
   )
 }
 
 export default Profile;