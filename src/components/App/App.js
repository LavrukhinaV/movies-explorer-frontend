import React from 'react';
import { useState, useEffect } from 'react';
import { Route, Switch, Redirect, useHistory } from 'react-router-dom'; 
import './App.css';
import Footer from '../Footer/Footer'
import Main from '../Main/Main'
import Header from '../Header/Header'
import PageError from '../PageError/PageError'
import Login from '../Login/Login'
import Register from '../Register/Register'
import Profile from '../Profile/Profile'
import Movies from '../Movies/Movies'
import SavedMovies from '../SavedMovies/SavedMovies'
import ProtectedRoute from '../ProtectedRoute/ProtectedRoute';
import { CurrentUserContext } from '../../contexts/CurrentUserContext';
import InfoTooltip from '../InfoTooltip/InfoTooltip'
import { SHORT_MOVIE } from '../../utils/const';
import { isURL } from '../../utils/const';
import * as Auth from '../../utils/Auth';
import * as MoviesApi from '../../utils/MoviesApi';

import mainApi from '../../utils/MainApi';

function App() {
  const [isLoading, setIsLoading] = useState(false)
  const [isHeaderMenuOpen, setHeaderMenuOpen] = useState(false)
  const [isPopupTooltipOpen, setPopupTooltipOpen] = useState(false)
  const [popupText, setPopupText] = useState("")
  const [isSuccess, setIsSuccess] = useState(false)
  const [currentUser, setCurrentUser] = useState({})
  const [loggedIn, setLoggedIn] = useState(false);
  const [savedMovies, setSavedMovies] = useState([]);
  const [shownMoviesOnMainPage, setShownMoviesOnMainPage] = useState(JSON.parse(localStorage.getItem('findMovies')));
  
  const history = useHistory();
  
  useEffect(() => {
    if (loggedIn) {
    Promise.all([mainApi.getProfile(), mainApi.getMovies()])
      .then(([userData, userMovies]) => {
        setCurrentUser(userData);
        setSavedMovies(userMovies)
      })
      .catch((err) => {
        console.log("Error: ", err);
        setPopupText('Во время запроса произошла ошибка. Возможно, проблема с соединением или сервер недоступен. Подождите немного и попробуйте ещё раз')
        setPopupTooltipOpen(true);
      })
      .finally(() => setIsLoading(false))
    }
  }, [loggedIn])



  function handleHeaderMenuClick() {
    setHeaderMenuOpen(true)
  }

  function closePopup() {
    setPopupTooltipOpen(false)
  }

  function closeHeaderMenu() {
    setHeaderMenuOpen(false)
  }

  const handleLogin = ({ email, password }) => {
    Auth.authorize(email, password)
      .then((data) => {
        if (data.token) {
          setLoggedIn(true)
          localStorage.setItem('jwtToken', data.token);
          tokenCheck();
        } else {
          setIsSuccess(false)
          setPopupText('Что-то пошло не так! Попробуйте ещё раз.')
          setPopupTooltipOpen(true)
        }
      })
      .catch(()=>{
        setIsSuccess(false)
        setPopupText('Что-то пошло не так! Попробуйте ещё раз.')
        setPopupTooltipOpen(true)
      })
  }

  const handleRegister = ({ name, email, password }) => {
    return Auth.register(name, email, password)
    .then(() => {
      handleLogin({email, password})
    })
    .catch(()=>{
      setIsSuccess(false)
      setPopupText('Что-то пошло не так! Попробуйте ещё раз.')
      setPopupTooltipOpen(true)
    })
  }

  const tokenCheck = () => {
    const jwtToken = localStorage.getItem('jwtToken');
    if (jwtToken){
      Auth.getContent(jwtToken)
      .then((res) => {
        if (res){
          setLoggedIn(true);
          history.push('/movies')
        }
      })
      .catch(err => console.log(`Ошибка: ${err}`))
    } else {
      signOut()
    }
  }

  const signOut = () => {
    setLoggedIn(false);
    localStorage.clear()
    setShownMoviesOnMainPage([]);
    setSavedMovies([]);
    history.push('/signin');
  }

  useEffect(() => {
    tokenCheck();
  }, []);

  function handleUpdateUser(data) {
    const newInfo = { name: data.name, email: data.email }
    mainApi.editProfile(newInfo)
    .then((data) => {
      setCurrentUser(data);
      setPopupText('Данные успешно изменены!')
      setIsSuccess(true)
      setPopupTooltipOpen(true);
    })
    .catch(() => {
      setPopupText('Что-то пошло не так! Попробуйте ещё раз.')
      setPopupTooltipOpen(true)
    })
  }

  function searcMoviesFromLocalStorage(textRequest, shortFilm) {
    let movies = JSON.parse(localStorage.getItem('movies'));
      if (shortFilm) {
        const shortMovies = movies.filter((item) => item.duration <= SHORT_MOVIE);
        handleFilterMovies(shortMovies, textRequest)
      } else {
      handleFilterMovies(movies, textRequest)
      }
  }

  function searcMoviesFromBeatfilmMoviesApi (textRequest, shortFilm ) {
    setIsLoading(true)
    MoviesApi.getMovies()
    .then((movies) => {
      localStorage.setItem('movies', JSON.stringify(movies));
      if (shortFilm) {
        const shortMovies = movies.filter((item) => item.duration <= SHORT_MOVIE);
        handleFilterMovies(shortMovies, textRequest)
      } else {
      handleFilterMovies(movies, textRequest)
      }
    })
    .catch((err) => {
      console.log("Error: ", err);
      setPopupText('Во время запроса произошла ошибка. Возможно, проблема с соединением или сервер недоступен. Подождите немного и попробуйте ещё раз')
      setPopupTooltipOpen(true);
    })
    .finally(() => setIsLoading(false))
  }

  function handleSearchMovies({ textRequest, shortFilm }) {
    localStorage.setItem('textRequest', JSON.stringify(textRequest));
    localStorage.setItem('shortFilm', JSON.stringify(shortFilm));

    if (localStorage.getItem('movies') !== null) {
      searcMoviesFromLocalStorage(textRequest, shortFilm)
    } else {
      searcMoviesFromBeatfilmMoviesApi (textRequest, shortFilm )
    }
  }

  function handleFilterMovies(movies, textRequest) {
    let findMovies = []
    
    movies.forEach((item) => {
      if (item.nameRU.toLowerCase().indexOf(textRequest.toLowerCase()) > -1) {
        findMovies.push(item)
      } 
    })
    if (findMovies.length === 0) {
      localStorage.removeItem('findMovies')
      setPopupText('Фильмы не найдены')
      setPopupTooltipOpen(true);
      setShownMoviesOnMainPage([])
      
    } else {
    localStorage.setItem('findMovies', JSON.stringify(findMovies));
    setShownMoviesOnMainPage(findMovies)
    }
  }

  function handleMovieSave(data) {

    const savedMovie = {
    country: data.country,
    description: data.description,
    director: data.director,
    duration: data.duration,
    year: data.year,
    image: `https://api.nomoreparties.co/${data.image.url}`,
    trailerLink: `${isURL(data.trailerLink) ? data.trailerLink : "https://www.youtube.com/"}`,
    nameRU: data.nameRU,
    nameEN: data.nameEN,
    movieId: data.id,
    thumbnail: `https://api.nomoreparties.co/${data.image.url}`
    }

    mainApi.saveMovie(savedMovie)
    .then((newSavedMovies) => {
      setSavedMovies([newSavedMovies, ...savedMovies])
    })
    .catch((err)=>{
      console.log(`Ошибка: ${err}`)
    })
  }

  function handleMovieDelete(movie) {
    let result = savedMovies.find(el => el.movieId === movie.id)
    mainApi.deleteMovie(result._id)
    .then((res) => {
      setSavedMovies(prevMovies => prevMovies.filter(item => item._id !== res._id))
    })
    .catch((err)=>{
      console.log(`Ошибка: ${err}`)
    })
  }

  function handleDeleteSavedMovies(movie) {
    mainApi.deleteMovie(movie._id)
    .then((res) => {
      setSavedMovies(prevMovies => prevMovies.filter(item => item._id !== res._id))
    })
    .catch((err)=>{
      console.log(`Ошибка: ${err}`)
    })
  }

  
  return (
    <CurrentUserContext.Provider value={currentUser}>
      <div className="page">
        <Switch>
          <Route exact path="/">
            <Header loggedIn={loggedIn}/>
            <Main warn="true"/>
            <Footer />
          </Route>
          <ProtectedRoute path="/movies" loggedIn={loggedIn}>
            <Header loggedIn={loggedIn} onHeaderMenu={handleHeaderMenuClick} isOpen={isHeaderMenuOpen} onClose={closeHeaderMenu}/>
            <Movies
              onSearchMovies={handleSearchMovies}
              movies={shownMoviesOnMainPage}
              onMovieSave={handleMovieSave}
              onMovieDelete={handleMovieDelete}
              savedMovies={savedMovies}
              textRequest={JSON.parse(localStorage.getItem('textRequest'))}
              shortFilm={JSON.parse(localStorage.getItem('shortFilm'))}
              isLoading={isLoading}
            />
            <Footer />
          </ProtectedRoute>
          <ProtectedRoute path="/saved-movies" loggedIn={loggedIn}>
            <Header  loggedIn={loggedIn} onHeaderMenu={handleHeaderMenuClick} isOpen={isHeaderMenuOpen} onClose={closeHeaderMenu}/>
            <SavedMovies
              movies={savedMovies}
              onMovieDelete={handleDeleteSavedMovies}
              isLoading={isLoading}
            />
            <Footer />
          </ProtectedRoute>
          <ProtectedRoute path="/profile" loggedIn={loggedIn}>
            <Header  loggedIn={loggedIn} onHeaderMenu={handleHeaderMenuClick} isOpen={isHeaderMenuOpen} onClose={closeHeaderMenu}/>
            <Profile handleSignOut={signOut} onUpdateUser={handleUpdateUser}/>
          </ProtectedRoute>
          <Route path="/signin" >
            <Login handleLogin={handleLogin} tokenCheck={tokenCheck}/>
          </Route>
          <Route path="/signup">
            <Register handleRegister={handleRegister}/>
          </Route>
          <Route path="*">
            <PageError />
          </Route>
          <Route exact path="/">
            {loggedIn ? <Redirect to="/movies" /> : <Redirect to="/" />}
          </Route>
        </Switch>
        <InfoTooltip
          isSuccess={isSuccess}
          isOpen={isPopupTooltipOpen}
          onClose={closePopup}
          message={popupText}
          />
      </div>
    </CurrentUserContext.Provider>
  );
}

export default App;
