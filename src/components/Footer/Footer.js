import './Footer.css'

function Footer() {
  return (
    <footer className="footer">
      <h2 className="footer__title">Учебный проект Яндекс.Практикум х BeatFilm.</h2>
      <div className="footer__container">
        <p className="footer__copyright">&copy; 2022</p>
        <nav className="footer__links">
          <ul className="footer__link-list">
            <li className="footer__link-item">
              <a className="footer__link" href="https://practicum.yandex.ru/" target="blank" rel="noreferrer">Яндекс.Практикум</a>
            </li>
            <li className="footer__link-item">
              <a className="footer__link" href="https://github.com/LavrukhinaV" target="blank">Github</a>
            </li>
          </ul>
        </nav>
      </div>
    </footer>
  );
}

export default Footer;