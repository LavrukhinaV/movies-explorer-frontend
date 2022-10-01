import { useRouteMatch } from 'react-router-dom';
import './MoviesCard.css'

function MoviesCard({ movie, onMovieSave, onMovieDelete, savedMovies }) {
  const { path } = useRouteMatch();
  const isMovies = path === '/movies';
  
  const isSaved = savedMovies.some(i => i.movieId === movie.id);

  const cardSaveButtonClassName = (
    `element__button ${isSaved ? 'element__button_type_saved' : 'element__button'}`
  );
  
  function handleSave() {
    if(isSaved) return onMovieDelete(movie);
    return onMovieSave(movie)
  }

  function handleDeleteMovie() {
    onMovieDelete(movie)
  }

  return (
    <>
      {isMovies ?
        <>
          <article className="element">
            <div className="element__description">
              <h2 className="element__title">{movie.nameRU}</h2>
              <span className="element__duration">{`${Math.trunc(movie.duration / 60) > 0 ? `${Math.trunc(movie.duration / 60)}ч` :
            ''} ${movie.duration % 60}м`}</span>
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
            <h2 className="element__title">{movie.nameRU}</h2>
            <span className="element__duration">{`${Math.trunc(movie.duration / 60) > 0 ? `${Math.trunc(movie.duration / 60)}ч` :
            ''} ${movie.duration % 60}м`}</span>
            <button type="button" className="element__button element__button_type_saved" onClick={handleDeleteMovie}></button>
          </div>
          <a href={movie.trailerLink} target="blanck">
            <img className="element__image" alt="Кадр из фильма" src={movie.image}/>
          </a>
        </article>
      </>
      }
    </>
  )
};

export default MoviesCard;