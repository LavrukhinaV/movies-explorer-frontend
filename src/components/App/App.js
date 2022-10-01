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
import * as Auth from '../../utils/Auth';
import * as MoviesApi from '../../utils/MoviesApi';

import mainApi from '../../utils/MainApi';

function App() {
  const [isLoading, setIsLoading] = useState(false)
  const [isHeaderMenuOpen, setHeaderMenuOpen] = useState(false)
  const [isPopupTooltipOpen, setPopupTooltipOpen] = useState(false)
  const [popupText, setPopupText] = useState("")
  const [currentUser, setCurrentUser] = useState({})
  const [loggedIn, setLoggedIn] = useState(false);
  const [movies, setMovies] = useState([]);
  const [savedMovies, setSavedMovies] = useState([]);
  const [shownMoviesOnMainPage, setShownMoviesOnMainPage] = useState(JSON.parse(localStorage.getItem('findMovies')));
  
  const history = useHistory();
  
  useEffect(() => {
    setIsLoading(true)
    if (loggedIn) {
    Promise.all([mainApi.getProfile(), mainApi.getMovies(), MoviesApi.getMovies()])
      .then(([userData, userMovies, movies]) => {
        setCurrentUser(userData);
        setSavedMovies(userMovies)
        localStorage.setItem('movies', JSON.stringify(movies));
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
          localStorage.setItem('jwtToken', data.token);
          tokenCheck();
        }
      })
      .catch(err => console.log(`Ошибка: ${err}`))
  }

  const handleRegister = ({ name, email, password }) => {
    return Auth.register(name, email, password)
    .then(() => {
      handleLogin({email, password})
    })
    .catch((err)=>{
      console.log(`Ошибка: ${err}`)
    })
  }

  const tokenCheck = () => {
    if (localStorage.getItem('jwtToken')){
      let jwtToken = localStorage.getItem('jwtToken');
      Auth.getContent(jwtToken)
      .then((res) => {
        if (res){
          setLoggedIn(true);
          history.push('/movies')
        }
      })
      .catch(err => console.log(`Ошибка: ${err}`))
    }
  }

  const signOut = () => {
    localStorage.clear();
    setLoggedIn(false);
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
      setPopupTooltipOpen(true);
    })
    .catch(() => (
      setPopupText('Что-то пошло не так! Попробуйте ещё раз.')
    ))
  }

  function handleSearchMovies({ textRequest, shortFilm }) {
    localStorage.setItem('textRequest', JSON.stringify(textRequest));
    localStorage.setItem('shortFilm', JSON.stringify(shortFilm));

    let movies = JSON.parse(localStorage.getItem('movies'));

    if (shortFilm) {
      const shortMovies = movies.filter((item) => item.duration <= 40);
      console.log(shortMovies)
      handleFilterMovies(shortMovies, textRequest)
    } else {

    handleFilterMovies(movies, textRequest)
    }
  }

  function handleFilterMovies(movies, textRequest) {
    let findMovies = []
    
    movies.forEach((item) => {
      if (item.nameRU.toLowerCase().indexOf(textRequest.toLowerCase()) > -1) {
        findMovies.push(item)
      } 
      // else if (item.nameEN?.toLowerCase().includes(textRequest)) {
      //   findMovies.push(item)
      // }
      // else if (item.description?.toLowerCase().includes(textRequest)) {
      //   findMovies.push(item)
      // }
      // else if (item.year?.toLowerCase().includes(textRequest)) {
      //   findMovies.push(item)
      // }
      // else if (item.country?.toLowerCase().includes(textRequest)) {
      //   findMovies.push(item)
      // }
    })
    if (findMovies.length === 0) {
      console.log('ничего не найдено')
      localStorage.removeItem('findMovies')
      setPopupText('Фильмы не найдены')
      setPopupTooltipOpen(true);
      setShownMoviesOnMainPage([])
      
    } else {
    setMovies(findMovies)
    localStorage.setItem('findMovies', JSON.stringify(findMovies));
    setShownMoviesOnMainPage(findMovies)
    }
  }

  function handleMovieSave(data) {
    const saveMovie = {
    country: data.country,
    description: data.description,
    director: data.director,
    duration: data.duration,
    year: data.year,
    image: `https://api.nomoreparties.co/${data.image.url}`,
    trailerLink: data.trailerLink,
    nameRU: data.nameRU,
    nameEN: data.nameEN,
    movieId: data.id,
    thumbnail: `https://api.nomoreparties.co/${data.image.url}`
    }

    mainApi.saveMovie(saveMovie)
    .then((newSavedMovies) => {
      setSavedMovies([newSavedMovies, ...savedMovies])
    })

  }

  function handleMovieDelete(movie) {
    let result = savedMovies.find(el => el.movieId === movie.id)
    mainApi.deleteMovie(result._id)
    .then((res) => {
      setSavedMovies(prevMovies => prevMovies.filter(item => item._id !== res._id))
    })
  }

  function handleDeleteSavedMovies(movie) {
    mainApi.deleteMovie(movie._id)
    .then((res) => {
      setSavedMovies(prevMovies => prevMovies.filter(item => item._id !== res._id))
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
            {loggedIn ? <Redirect to="/movies" /> : <Redirect to="/signin" />}
          </Route>
        </Switch>
        <InfoTooltip
            isOpen={isPopupTooltipOpen}
            onClose={closePopup}
            message={popupText}
          />
      </div>
    </CurrentUserContext.Provider>
  );
}

export default App;
