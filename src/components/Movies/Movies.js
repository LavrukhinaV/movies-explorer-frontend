import './Movies.css'
import MoviesCardList from '../MoviesCardList/MoviesCardList'
import SearchForm from '../SearchForm/SearchForm'

function Movies(props) {

  return (
    <main className="content">
      <SearchForm onSearchMovies={props.onSearchMovies} textRequestFoundMovies={props.textRequest}/>
      <MoviesCardList movies={props.movies} onMovieSave={props.onMovieSave} onMovieDelete={props.onMovieDelete} savedMovies={props.savedMovies} searchMovies={props.searchMovies}/>
  </main>
  );
}

export default Movies;