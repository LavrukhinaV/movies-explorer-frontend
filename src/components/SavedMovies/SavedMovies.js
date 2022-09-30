import './SavedMovies.css'
import MoviesCardList from '../MoviesCardList/MoviesCardList'
import SearchForm from '../SearchForm/SearchForm'

function Movies(props) {
  return (
    <main className="content">
      <SearchForm onSearchMovies={props.onSearchMovies}/>
      <MoviesCardList movies={props.movies} onMovieDelete={props.onMovieDelete}/>
  </main>
  );
}

export default Movies;