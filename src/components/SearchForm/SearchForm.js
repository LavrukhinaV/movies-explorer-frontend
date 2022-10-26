import { useState, useEffect } from 'react';
import { useForm } from "react-hook-form";
import './SearchForm.css'
import { useComponentDidMount } from '../../utils/const'

function SearchForm({ onSearchMovies,  textRequestFoundMovies, shortFilmFoundMovies }) {

  const [textRequest, setTextRequest] = useState(textRequestFoundMovies)
  const [shortFilm, setShortFilm] = useState(shortFilmFoundMovies)
  const [focused, setFocused] = useState(true);

  const { 
    register, handleSubmit, formState: { errors, isValid }, watch
  } = useForm({
    // mode: "onChange",
    defaultValues: { 
      textRequest: textRequestFoundMovies
    }}
  );
  
  const watchRequest = watch('textRequest')

  const isComponentMounted = useComponentDidMount();

  useEffect(() => {
    if(isComponentMounted) {
      onSearchMovies({ textRequest, shortFilm})
    }
  }, [shortFilm])


  useEffect(() => {
    setTextRequest(watchRequest)
  }, [watchRequest])

  const onSubmit = (data) => {
    setTextRequest(data.textRequest)
    setShortFilm(shortFilm)
    onSearchMovies({ textRequest, shortFilm})
  }
  
  function handleFocus(e) {
    let value = e.target.value
    if (!value) {
    setFocused(false)
    }
  };

  function handleChange(e) {
    toggleCheckbox(e.target.checked);
  }

  function toggleCheckbox(checkboxStatus) {
   setShortFilm(checkboxStatus)
   onSearchMovies({ textRequest, shortFilm})
  }
 
  return(
    <form name="search" className="form form_type_search" onSubmit={handleSubmit(onSubmit)}>
      <div className="form__search-container">
        <label className="form__label form__label_type_text">
          <span className={`form__placeholder ${focused ? "form__placeholder_dispay_none" : "form__placeholder_type_image"}`}></span>
          <span className={`form__placeholder ${focused ? "form__placeholder_dispay_none" : "form__placeholder_type_text"}`}>Фильм</span>
          <div className='form__container_type_search'>
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
            <span className={`${focused ? "form__error-label_type_serach-movies" : "form__error-label_display_none"}`}>
              {errors?.textRequest && <p className="form__error-text_type_serach-movies">{errors?.textRequest?.message || "Что-то пошло не так..."}</p>}
            </span>
            </div>
          <button 
            type="submit"
            className={`form__btn ${focused && "form__btn_type_input-notfocused"}`}
            // disabled={!isValid}
          />
        </label>
        <label className="form__label form__label_type_checkbox">
          <input type="checkbox" onChange={handleChange} className="form__checkbox_type_invisible" defaultChecked={shortFilmFoundMovies}/>
          <span className="form__checkbox_type_visible"/>
          <span className="form__label-text">Короткометражки</span>
        </label> 
      </div>
    </form>
  )
};

export default SearchForm;