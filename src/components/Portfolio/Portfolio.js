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
              <a className="portfolio__link" href="" target="blanck">Статичный сайт</a>
              <img className="portfolio__link-image" src={link} alt="Перейти по ссылке"></img>
            </li>
            <li className="portfolio__link-item">
              <a className="portfolio__link" href="" target="blanck">Адаптивный сайт</a>
              <img className="portfolio__link-image" src={link} alt="Перейти по ссылке"></img>
            </li>
            <li className="portfolio__link-item">
              <a className="portfolio__link" href="" target="blanck">Одностраничное приложение</a>
              <img className="portfolio__link-image" src={link} alt="Перейти по ссылке"></img>
            </li>
          </ul>
        </nav>
      </article>
  </section>
  )
};

export default Portfolio;