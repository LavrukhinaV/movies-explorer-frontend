import './Movies.css'
import Footer from '../Footer/Footer'
import MoviesCardList from '../MoviesCardList/MoviesCardList'

function Movies() {
  return (
    <main className="content">
      <MoviesCardList/>
      <Footer/>
  </main>
  );
}

export default Movies;