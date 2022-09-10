import './AboutMe.css'
import photo from '../../images/photo.jpg'

function AboutMe() {
  return (
    <section className="section section_about-me">
      <h2 className="section__title">Студент</h2>
      <article className="about-me">
        <img className="about-me__photo" src={photo} alt="Фото"></img>
        <h3 className="about-me__name">Виктория</h3>
        <h4 className="about-me__profession">Фронтенд-разработчик, 26 лет</h4>
        <p className="about-me__info">
          Я родилась на Алтае, сейчас живу в Московской области. Люблю кататься на сноуборде, путешствовать и собак. 
          На протяжении пяти лет работаю техническим специалистом. В прошлом году решила наконец-то осуществить свою мечту и начала учебу в Практикуме на курсе веб-разработки. kkkkkkkkkkk
        </p>
        <a className="about-me__link" href="https://github.com/LavrukhinaV" target="blank">Github</a>
      </article>
    </section>
  )
};

export default AboutMe;