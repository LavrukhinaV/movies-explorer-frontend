import sign from '../../images/sign.svg';
import './Promo.css'

function Promo() {
  return (
    <section className="promo">
      <h1 className="promo__title">Учебный проект студента факультета Веб-разработки.</h1>
      <img className="promo__illustration" src={sign} alt="Лого"></img>
    </section>
)};

export default Promo;