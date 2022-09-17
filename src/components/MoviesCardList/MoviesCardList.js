import { useRouteMatch } from 'react-router-dom';
import './MoviesCardList.css'
import MoviesCard from '../MoviesCard/MoviesCard'

function MoviesCardList() {
  const { path } = useRouteMatch();
  const isMovies = path === '/movies';

  return (
    <section className="elements">
      {isMovies ?
        <>
          <MoviesCard/>
          <button className='button__download-movies'>Ещё</button>
        </>
      :
        <>
          <MoviesCard/>
        </>
      }
    </section>
  );
}

export default MoviesCardList;