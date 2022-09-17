import './Portfolio.css'
import link from '../../images/link.svg'

function Portfolio() {
  return(
    <section className="section section_portfolio">
    <article className="portfolio">
      <h3 className="portfolio__title">Портфолио</h3>
        <nav className="portfolio__links">
          <ul className="portfolio__link-list">
            <li className="portfolio__link-item">
              <a className="portfolio__link" href="https://lavrukhinav.github.io/how-to-learn/" target="blanck">
                <p className="portfolio__link-text">Статичный сайт</p>
                <img className="portfolio__link-image" src={link} alt="Перейти по ссылке"></img>
              </a>
            </li>
            <li className="portfolio__link-item">
              <a className="portfolio__link" href="https://lavrukhinav.github.io/travel-project/index.html" target="blanck">
                <p className="portfolio__link-text">Адаптивный сайт</p>
                <img className="portfolio__link-image" src={link} alt="Перейти по ссылке"></img>
              </a>
            </li>
            <li className="portfolio__link-item">
              <a className="portfolio__link" href="http://lavrukhina.nomoredomains.sbs/" target="blanck">
                <p className="portfolio__link-text">Одностраничное приложение</p>
                <img className="portfolio__link-image" src={link} alt="Перейти по ссылке"></img>
              </a>
            </li>
          </ul>
        </nav>
      </article>
  </section>
  )
};

export default Portfolio;