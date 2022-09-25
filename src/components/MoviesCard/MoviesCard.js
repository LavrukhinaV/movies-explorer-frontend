import { Link, useRouteMatch } from 'react-router-dom';
import './MoviesCard.css'
import filmIllustration from '../../images/film.jpg'
import filmIllustration2 from '../../images/film2.jpg'
import filmIllustration3 from '../../images/film3.jpg'
import filmIllustration4 from '../../images/film4.jpg'
import filmIllustration5 from '../../images/film5.jpg'
import filmIllustration6 from '../../images/film6.jpg'
import filmIllustration7 from '../../images/film7.jpg'
import filmIllustration8 from '../../images/film8.jpg'
import filmIllustration9 from '../../images/film9.jpg'
import filmIllustration10 from '../../images/film10.jpg'
import filmIllustration11 from '../../images/film11.jpg'
import filmIllustration12 from '../../images/film12.jpg'

function MoviesCard({ movie, onMovieSave, savedMovies }) {
  const { path } = useRouteMatch();
  const isMovies = path === '/movies';

  const isSaved = savedMovies.some(i => i.movieId === movie.id);

  console.log(isSaved)
  
  const cardSaveButtonClassName = (
    `element__button ${isSaved ? 'element__button_type_saved' : 'element__button'}`
  );
  function handleSave() {
    onMovieSave(movie)
  }
  return (
    <>
      {isMovies ?
        <>
          <article className="element">
            <div className="element__description">
              <h2 className="element__title">{movie.nameRU}</h2>
              <span className="element__duration">{movie.duration}</span>
              <button type="button" className={cardSaveButtonClassName} onClick={handleSave}></button>
            </div>
            <a href={movie.trailerLink} target="blanck">
              <img className="element__image" alt="Кадр из фильма" src={`https://api.nomoreparties.co/`+movie.image.url}/>
            </a>
          </article>
        </>
      :
      <>
        <article className="element">
          <div className="element__description">
            <h2 className="element__title">33 слова о дизайне</h2>
            <span className="element__duration">1ч 47м</span>
            <button type="button" className="element__button element__button_type_delete"></button>
          </div>
          <img className="element__image" alt="Кадр из фильма" src={filmIllustration}/>
        </article>
        <article className="element">
          <div className="element__description">
            <h2 className="element__title">33 слова о дизайне</h2>
            <span className="element__duration">1ч 47м</span>
            <button type="button" className="element__button element__button_type_delete"></button>
          </div>
          <img className="element__image" alt="Кадр из фильма" src={filmIllustration2}/>
        </article>
        <article className="element">
          <div className="element__description">
            <h2 className="element__title">33 слова о дизайне</h2>
            <span className="element__duration">1ч 47м</span>
            <button type="button" className="element__button element__button_type_delete"></button>
          </div>
          <img className="element__image" alt="Кадр из фильма" src={filmIllustration3}/>
        </article>
      </>
      }
    </>
  )
};

export default MoviesCard;