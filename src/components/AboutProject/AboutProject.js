import './AboutProject.css'

function AboutProject() {
  return (
    <section className="section">
    <h2 className="section__title">О проекте</h2>
    <ul className="table">
      <li className="table__cell">
        <h3 className="table__heading">Дипломный проект включал 5 этапов</h3>
        <p className="table__text">Составление плана, работу над бэкендом, вёрстку, добавление функциональности и финальные доработки.</p>
      </li>
      <li className="table__cell">
        <h3 className="table__heading">На выполнение диплома ушло 5 недель</h3>
        <p className="table__text">У каждого этапа был мягкий и жёсткий дедлайн, которые нужно было соблюдать, чтобы успешно защититься.</p>
      </li>
    </ul>
    <ul className="stages">
      <li className="stages__item stages__item_background-color_green">
        <p className="stage__description">1 неделя</p>
      </li>
      <li className="stages__item stages__item_background-color_grey">
        <p className="stage__description">4 недели</p>
      </li>
      <li className="stages__item stages__item_font-color-grey">
        <p className="stage__description">Back-end</p>
      </li>
      <li className="stages__item stages__item_font-color-grey">
        <p className="stage__description">Front-end</p>
      </li>
    </ul>
  </section>
  )
}

export default AboutProject;