import './Movies.css'
import MoviesCardList from '../MoviesCardList/MoviesCardList'
import SearchForm from '../SearchForm/SearchForm'

function Movies() {
  return (
    <main className="content">
      <SearchForm/>
      <MoviesCardList/>
  </main>
  );
}

export default Movies;