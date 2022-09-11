import './MoviesCardList.css'
import MoviesCard from '../MoviesCard/MoviesCard'

function MoviesCardList() {
  return (
    <section className="elements">
      <MoviesCard/>
      <button className='button__download-movies'>Ещё</button>
    </section>
  );
}

export default MoviesCardList;