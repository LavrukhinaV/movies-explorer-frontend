import './Movies.css'
import MoviesCardList from '../MoviesCardList/MoviesCardList'
import SearchForm from '../SearchForm/SearchForm'
import { useState, useEffect } from 'react';

function Movies(props) {
  const [moviesNotFound, setMoviesNotFound] = useState(false)

  useEffect(() => {
    if(props.movies) setMoviesNotFound(true) 
  }, [props.movies])
  
  return (
    <main className="content">
      <SearchForm
        onSearchMovies={props.onSearchMovies}
        textRequestFoundMovies={props.textRequest}
        shortFilmFoundMovies={props.shortFilm}
      />
      {moviesNotFound &&
        <MoviesCardList
          movies={props.movies}
          onMovieSave={props.onMovieSave}
          onMovieDelete={props.onMovieDelete}
          savedMovies={props.savedMovies}
          isLoading={props.isLoading}
        />
      }
  </main>
  );
}

export default Movies;