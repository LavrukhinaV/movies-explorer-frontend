import './Profile.css';

function Profile() {
  return (
    <div className="form">
      <form className="form__container form__container_type_profile">
        <h1 className="form__header form__header_type_profile">Привет, Виталий!</h1>
        <label class="form__field">
          <span className='form__placeholder form__placeholder_type_profile'>Имя</span>
          <input id="name" required name="name"  className="form__input form__input_type_profile" type="text"/>
        </label>
        <label class="form__field">
          <span className='form__placeholder form__placeholder_type_profile'>E-mail</span>
          <input id="name" required name="name"  className="form__input form__input_type_profile" type="text"/>
        </label>
        <button type="submit" className="form__button form__button_type_profile">Редактировать</button>
      </form>
      <button type="submit" className="form__button_type_exit">Выйти из аккаунта</button>
   </div>
   )
 }
 
 export default Profile;