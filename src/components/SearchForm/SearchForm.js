import { useState, useEffect } from 'react';
import { useForm } from "react-hook-form";
import './SearchForm.css'

function SearchForm({ onSearchMovies, textRequestFoundMovies, shortFilmFoundMovies }) {

  const [textRequest, setTextRequest] = useState(textRequestFoundMovies)
  const [shortFilm, setShortFilm] = useState(shortFilmFoundMovies)
  const [focused, setFocused] = useState(true);

  const { 
    register, handleSubmit, formState: { isValid }, watch
  } = useForm({
    mode: "onChange",
    defaultValues: { 
      textRequest: textRequestFoundMovies
    }
    }
  );
  
  const watchRequest = watch('textRequest')
  const watchSwitch = watch('switchShortMovies')

  useEffect(() => {
    setTextRequest(watchRequest)
    setShortFilm(watchSwitch)
  }, [watchRequest, watchSwitch])

  const onSubmit = (data) => {
    setTextRequest(data.textRequest)
    setShortFilm(data.switchShortMovies)
    onSearchMovies({ textRequest, shortFilm})
  }
  
  
  function handleFocus(e) {
    let value = e.target.value
    if (!value) {
    setFocused(false)
    }
  };
 
  return(
    <form name="search" className="form form_type_search" onSubmit={handleSubmit(onSubmit)}>
      <div className="form__search-container">
        <label className="form__label form__label_type_text">
          <span className={`form__placeholder ${focused ? "form__placeholder_dispay_none" : "form__placeholder_type_image"}`}></span>
          <span className={`form__placeholder ${focused ? "form__placeholder_dispay_none" : "form__placeholder_type_text"}`}>Фильм</span>
          <input
            {...register('textRequest', {
              required: "Поле обязательно к заполнению.",
              
            })
          }
            id="textRequest"
            className="form__input form__input_type_search"
            type="text"
            onBlur={handleFocus}
            onFocus={() =>
              setFocused(true)
            }
            />
          <button 
            type="submit"
            className={`form__btn ${focused && "form__btn_type_input-notfocused"}`}
            disabled={!isValid}
          />
        </label>
        <label className="form__label form__label_type_checkbox">
          <input
          {...register('switchShortMovies')}
            type="checkbox" className="form__checkbox_type_invisible"
            defaultChecked={shortFilmFoundMovies}
          />
          <span className="form__checkbox_type_visible"/>
          <span className="form__label-text">Короткометражки</span>
        </label> 
      </div>
    </form>
  )
};

export default SearchForm;