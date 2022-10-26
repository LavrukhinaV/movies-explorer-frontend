import { useState, useEffect } from 'react';
import { useRouteMatch } from 'react-router-dom';
import './MoviesCardList.css'
import MoviesCard from '../MoviesCard/MoviesCard'
import Preloader from '../Preloader/Preloader';

import {
  SCREEN_SIZE_MOBILE,
  MOBILE_NUMBER_MOVIES,
  MIDLE_NUMBER_MOVIES,
  SCREEN_SIZE_DESKTOP,
  DESKTOP_NUMBER_MOVIES,
  LOAD_MORE_DESKTOP,
  LOAD_MORE_MOBILE
} from '../../utils/const';

function MoviesCardList(props) {
  const { path } = useRouteMatch();
  const isMovies = path === '/movies';

  const [numberMovies, setNumberMovies] = useState()
  const buttonClassName = (
    `${(props.movies.length>numberMovies) ? 'button__download-movies' : 'button__download-movies_disabled' }`
  )
  
  const size = useWindowSize();

  useEffect(() => {
    handleWindowResize();
  }, [size]);

  function useWindowSize() {
    const [windowSize, setWindowSize] = useState({
      width: undefined,
    });

    useEffect(() => {
      function handleResize() {
        setWindowSize({
          width: window.innerWidth,
        });
      }

      window.addEventListener("resize", handleResize);

      handleResize();

      return () => window.removeEventListener("resize", handleResize);
    }, []);

    return windowSize;
  }


  function handleWindowResize () {
    if(size.width >= SCREEN_SIZE_DESKTOP) {
      setNumberMovies(DESKTOP_NUMBER_MOVIES)
    }
    else if (size.width > SCREEN_SIZE_MOBILE) {
      setNumberMovies(MIDLE_NUMBER_MOVIES)
    } else {
    setNumberMovies(MOBILE_NUMBER_MOVIES)}
  }

  function handleClick() {
    if(size.width >= SCREEN_SIZE_DESKTOP) {
      setNumberMovies(numberMovies+LOAD_MORE_DESKTOP)
    } else {
    setNumberMovies(numberMovies+LOAD_MORE_MOBILE)}
  }

  return (
    <section className="elements">
      {props.isLoading ?
      <Preloader isLoading={props.isLoading}/>
      :
      isMovies ?
        <>
          {props.movies.slice(0, numberMovies).map((movie) => 
            (<MoviesCard movie={movie} key={movie.id} onMovieSave={props.onMovieSave} onMovieDelete={props.onMovieDelete} savedMovies={props.savedMovies} />)
          )}
          <button type="button" className={buttonClassName} onClick={handleClick}>Ещё</button>
        </>
      :
        <>
          {props.movies?.map((movie) => 
            (<MoviesCard  key={movie._id} movie={movie} savedMovies={props.movies} onMovieDelete={props.onMovieDelete}/>)
          )}
        </>
      }
    </section>
  );
}

export default MoviesCardList;