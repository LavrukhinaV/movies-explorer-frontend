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
import Preloader from '../Preloader/Preloader';
import ProtectedRoute from '../ProtectedRoute/ProtectedRoute';
import { CurrentUserContext } from '../../contexts/CurrentUserContext';
import InfoTooltip from '../InfoTooltip/InfoTooltip'
import * as Auth from '../../utils/Auth';
import * as MoviesApi from '../../utils/MoviesApi';

import mainApi from '../../utils/MainApi';

function App() {
  const [isHeaderMenuOpen, setHeaderMenuOpen] = useState(false)
  const [isPopupTooltipOpen, setPopupTooltipOpen] = useState(false)
  const [currentUser, setCurrentUser] = useState({})
  const [loggedIn, setLoggedIn] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false)
  const [movies, setMovies] = useState([]);
  const [savedMovies, setSavedMovies] = useState([]);

  const history = useHistory();

  useEffect(() => {
    if (loggedIn) {
    Promise.all([mainApi.getProfile(), mainApi.getMovies()])
      .then(([userData, movies]) => {
        setCurrentUser(userData);
        setSavedMovies(movies)
      })
      .catch((err) => {
        console.log("Error: ", err);
      });
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
    localStorage.removeItem('jwtToken');
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
      setIsSuccess(true);
      setPopupTooltipOpen(true);
    })
    .catch(err => console.log(`Ошибка: ${err}`))
  }

  function handleSearchMovies({ textRequest, shortFilm }) {
    localStorage.setItem('textRequest', JSON.stringify(textRequest));
    localStorage.setItem('shortFilm', JSON.stringify(shortFilm));
    MoviesApi.getMovies()
    .then((movies) => {
      localStorage.setItem('movies', JSON.stringify(movies));
      handleFilterMovies(movies, textRequest)
    })
  }

  function handleFilterMovies(movies, textRequest) {
    let findMovies = []
    movies.forEach((item) => {
      if (item.nameRU?.toLowerCase().includes(textRequest)) {
        findMovies.push(item)
      }
      else if (item.nameEN?.toLowerCase().includes(textRequest)) {
        findMovies.push(item)
      }
      else if (item.description?.toLowerCase().includes(textRequest)) {
        findMovies.push(item)
      }
      else if (item.year?.toLowerCase().includes(textRequest)) {
        findMovies.push(item)
      }
      else if (item.country?.toLowerCase().includes(textRequest)) {
        findMovies.push(item)
      }
    })
    console.log(findMovies)
    
    setMovies(findMovies)
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
      console.log(savedMovies)
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
            <Movies onSearchMovies={handleSearchMovies} movies={movies} onMovieSave={handleMovieSave} savedMovies={savedMovies}/>
            <Footer />
          </ProtectedRoute>
          <ProtectedRoute path="/saved-movies" loggedIn={loggedIn}>
            <Header  loggedIn={loggedIn} onHeaderMenu={handleHeaderMenuClick} isOpen={isHeaderMenuOpen} onClose={closeHeaderMenu}/>
            <SavedMovies />
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
            isSuccess={isSuccess}
            success={'Данные успешно изменены!'}
            error={'Что-то пошло не так! Попробуйте ещё раз.'}
          />
      </div>
    </CurrentUserContext.Provider>
  );
}

export default App;
