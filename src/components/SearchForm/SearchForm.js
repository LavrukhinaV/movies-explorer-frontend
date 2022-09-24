import { useForm } from "react-hook-form";
import './SearchForm.css'

function SearchForm() {
  const { 
    register, handleSubmit, formState: { isValid } 
  } = useForm({
    mode: "onChange"
  });
  const onSubmit = data => console.log(data);

  return(
    <form name="search" className="form form_type_search" onSubmit={handleSubmit(onSubmit)}>
      <div className="form__search-container">
        <label className="form__label form__label_type_text">
        <span className="form__placeholder form__placeholder_type_image"></span>
          <span className="form__placeholder form__placeholder_type_text">Фильм</span>
          <input 
            {...register('movie', {
              required: "Поле обязательно к заполнению.",
            })}
            className="form__input form__input_type_search"/>
          <button type="submit" className="form__btn" disabled={!isValid}/>
        </label>
        <label className="form__label form__label_type_checkbox">
          <input type="checkbox" className="form__checkbox_type_invisible" />
          <span className="form__checkbox_type_visible"/>
          <span className="form__label-text">Короткометражки</span>
        </label> 
      </div>
    </form>
  )
};

export default SearchForm;