import React from 'react';
import {useEffect, useState} from 'react';
import { Route, Switch } from 'react-router-dom'; 
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
import MobileMenu from '../MobileMenu/MobileMenu'

function App() {
  const [isHeaderMenuOpen, setHeaderMenuOpen] = useState(false)

  function handleHeaderMenuClick() {
    setHeaderMenuOpen(true)
  }

  function closeHeaderMenu() {
    setHeaderMenuOpen(false)
  }

  return (
    <div className="page">
      
      <Switch>
        <Route exact path="/">
          <Header />
          <Main warn="true"/>
          <Footer />
        </Route>
        <Route path="/movies">
          <Header onHeaderMenu={handleHeaderMenuClick} isOpen={isHeaderMenuOpen} onClose={closeHeaderMenu}/>
          <Movies />
          <Footer />
        </Route>
        <Route path="/saved-movies">
          <Header  onHeaderMenu={handleHeaderMenuClick} isOpen={isHeaderMenuOpen} onClose={closeHeaderMenu}/>
          <SavedMovies />
          <Footer />
        </Route>
        <Route path="/profile">
          <Header  onHeaderMenu={handleHeaderMenuClick} isOpen={isHeaderMenuOpen} onClose={closeHeaderMenu}/>
          <Profile />
        </Route>
        <Route path="/signin">
          <Login />
        </Route>
        <Route path="/signup">
          <Register />
        </Route>
        <Route path="*">
          <PageError />
        </Route>
      </Switch>
    </div>
  );
}

export default App;
