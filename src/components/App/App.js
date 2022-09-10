import './App.css';
import Footer from '../Footer/Footer'
import Main from '../Main/Main'
import Header from '../Header/Header'
import PageError from '../PageError/PageError'

function App() {
  return (
    <div className="page">
      {/* <Header/>
      <Main/>
      <Footer/> */}
      <PageError/>
    </div>
  );
}

export default App;
