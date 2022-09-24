import './Techs.css'

function Techs() {
  return(
    <section className="section section_techs">
      <h2 className="section__title">Технологии</h2>
      <article className="seven-technologies">
        <h3 className="seven-technologies__title">7 технологий</h3>
        <p className="seven-technologies__subtitle">На курсе веб-разработки мы освоили технологии, которые применили в дипломном проекте.</p>
        <ul className="cards">
          <li className="cards__item">
            <h4 className="cards__title">HTML</h4>
          </li>
          <li className="cards__item">
            <h4 className="cards__title">CSS</h4>
          </li>
          <li className="cards__item">
            <h4 className="cards__title">JS</h4>
          </li>
          <li className="cards__item">
            <h4 className="cards__title">React</h4>
          </li>
          <li className="cards__item">
            <h4 className="cards__title">Git</h4>
          </li>
          <li className="cards__item">
            <h4 className="cards__title">Express.js</h4>
          </li>
          <li className="cards__item">
            <h4 className="cards__title">mongoDB</h4>
          </li>
        </ul>
      </article>
    </section>
  )
}

export default Techs;