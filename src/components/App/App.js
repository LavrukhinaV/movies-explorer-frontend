import './App.css';
import Footer from '../Footer/Footer'
import Main from '../Main/Main'
import Header from '../Header/Header'
import PageError from '../PageError/PageError'
import Login from '../Login/Login'
import Register from '../Register/Register'
import Profile from '../Profile/Profile'
import Movies from '../Movies/Movies'

function App() {
  return (
    <div className="page">
      {/* <Header/>
      <Main/>
      <Footer/> */}
      {/* <PageError/> */}
      <Movies/>
    </div>
  );
}

export default App;
