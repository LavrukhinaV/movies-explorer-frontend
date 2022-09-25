import './Movies.css'
import MoviesCardList from '../MoviesCardList/MoviesCardList'
import SearchForm from '../SearchForm/SearchForm'

function Movies(props) {

  return (
    <main className="content">
      <SearchForm onSearchMovies={props.onSearchMovies}/>
      <MoviesCardList movies={props.movies} onMovieSave={props.onMovieSave} savedMovies={props.savedMovies}/>
  </main>
  );
}

export default Movies;