import './SavedMovies.css'
import MoviesCardList from '../MoviesCardList/MoviesCardList'
import SearchForm from '../SearchForm/SearchForm'
import { useState, useEffect } from 'react';

function SavedMovies(props) {
  const [shownFilms, setShownFilms] = useState(props.movies)

  useEffect(() => {
    setShownFilms(props.movies);
  }, [props.movies]);

  function handleSearchSubmit ({textRequest, shortFilm}) {
    if(shortFilm) {
      const shortMovies = props.movies.filter((item) => item.duration <= 40);
      handleFilterMovies(shortMovies, textRequest)
    } else {
    handleFilterMovies(props.movies, textRequest)
    }
  }

  function handleFilterMovies(movies, textRequest) {
    let findMovies = []
    movies.forEach((item) => {
      if (item.nameRU.toLowerCase().indexOf(textRequest.toLowerCase()) > -1) {
        findMovies.push(item)
      }
    })
    setShownFilms(findMovies)
  }

  return (
    <main className="content">
      <SearchForm
        onSearchMovies={handleSearchSubmit}
        textRequestFoundMovies={''}
        shortFilmFoundMovies={false}
      />
      <MoviesCardList
        movies={shownFilms}
        onMovieDelete={props.onMovieDelete}
      />
  </main>
  );
}

export default SavedMovies;