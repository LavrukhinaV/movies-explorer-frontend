import './SearchForm.css'

function SearchForm() {
  return(
    <form name="search" className="form form_type_search">
      <div className="form__search-container">
        <label className="form__label form__label_type_text">
        <span className="form__placeholder form__placeholder_type_image"></span>
          <span className="form__placeholder form__placeholder_type_text">Фильм</span>
          <input class="form__input form__input_type_search"/>
          <button className="form__btn"/>
        </label>
        <label className="form__label form__label_type_checkbox">
          <input type="checkbox" className="form__checkbox_type_invisible" />
          <span className="form__checkbox_type_visible"/>
          <span class="form__label-text">Короткометражки</span>
        </label> 
      </div>
    </form>
  )
};

export default SearchForm;