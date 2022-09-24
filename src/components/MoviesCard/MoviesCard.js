import { useRouteMatch } from 'react-router-dom';
import './MoviesCard.css'
import filmIllustration from '../../images/film.jpg'
import filmIllustration2 from '../../images/film2.jpg'
import filmIllustration3 from '../../images/film3.jpg'
import filmIllustration4 from '../../images/film4.jpg'
import filmIllustration5 from '../../images/film5.jpg'
import filmIllustration6 from '../../images/film6.jpg'
import filmIllustration7 from '../../images/film7.jpg'
import filmIllustration8 from '../../images/film8.jpg'
import filmIllustration9 from '../../images/film9.jpg'
import filmIllustration10 from '../../images/film10.jpg'
import filmIllustration11 from '../../images/film11.jpg'
import filmIllustration12 from '../../images/film12.jpg'

function MoviesCard() {
  const { path } = useRouteMatch();
  const isMovies = path === '/movies';

  return (
    <>
      {isMovies ?
        <>
        <article className="element">
          <div className="element__description">
            <h2 className="element__title">33 слова о дизайне</h2>
            <span className="element__duration">1ч 47м</span>
            <button type="button" className="element__button"></button>
          </div>
          <img className="element__image" alt="Кадр из фильма" src={filmIllustration}/>
        </article>
        <article className="element">
          <div className="element__description">
            <h2 className="element__title">33 слова о дизайне</h2>
            <span className="element__duration">1ч 47м</span>
            <button type="button" className="element__button"></button>
          </div>
          <img className="element__image" alt="Кадр из фильма" src={filmIllustration2}/>
        </article>
        <article className="element">
            <div className="element__description">
              <h2 className="element__title">33 слова о дизайне</h2>
              <span className="element__duration">1ч 47м</span>
              <button type="button" className="element__button element__button_type_saved"></button>
            </div>
            <img className="element__image" alt="Кадр из фильма" src={filmIllustration3}/>
          </article>
        <article className="element">
          <div className="element__description">
            <h2 className="element__title">33 слова о дизайне</h2>
            <span className="element__duration">1ч 47м</span>
            <button type="button" className="element__button"></button>
          </div>
          <img className="element__image" alt="Кадр из фильма" src={filmIllustration4}/>
        </article>
        <article className="element">
          <div className="element__description">
            <h2 className="element__title">33 слова о дизайне</h2>
            <span className="element__duration">1ч 47м</span>
            <button type="button" className="element__button element__button_type_saved"></button>
          </div>
          <img className="element__image" alt="Кадр из фильма" src={filmIllustration5}/>
        </article>
        <article className="element">
          <div className="element__description">
            <h2 className="element__title">33 слова о дизайне</h2>
            <span className="element__duration">1ч 47м</span>
            <button type="button" className="element__button"></button>
          </div>
          <img className="element__image" alt="Кадр из фильма" src={filmIllustration6}/>
        </article>
        <article className="element">
          <div className="element__description">
            <h2 className="element__title">33 слова о дизайне</h2>
            <span className="element__duration">1ч 47м</span>
            <button type="button" className="element__button"></button>
          </div>
          <img className="element__image" alt="Кадр из фильма" src={filmIllustration7}/>
        </article>
        <article className="element">
          <div className="element__description">
            <h2 className="element__title">33 слова о дизайне</h2>
            <span className="element__duration">1ч 47м</span>
            <button type="button" className="element__button"></button>
          </div>
          <img className="element__image" alt="Кадр из фильма" src={filmIllustration8}/>
        </article>
        <article className="element">
          <div className="element__description">
            <h2 className="element__title">33 слова о дизайне</h2>
            <span className="element__duration">1ч 47м</span>
            <button type="button" className="element__button"></button>
          </div>
          <img className="element__image" alt="Кадр из фильма" src={filmIllustration9}/>
        </article>
        <article className="element">
          <div className="element__description">
            <h2 className="element__title">33 слова о дизайне</h2>
            <span className="element__duration">1ч 47м</span>
            <button type="button" className="element__button element__button_type_saved"></button>
          </div>
          <img className="element__image" alt="Кадр из фильма" src={filmIllustration10}/>
        </article>
        <article className="element">
            <div className="element__description">
              <h2 className="element__title">33 слова о дизайне</h2>
              <span className="element__duration">1ч 47м</span>
              <button type="button" className="element__button"></button>
            </div>
            <img className="element__image" alt="Кадр из фильма" src={filmIllustration11}/>
        </article>
        <article className="element">
          <div className="element__description">
            <h2 className="element__title">33 слова о дизайне</h2>
            <span className="element__duration">1ч 47м</span>
            <button type="button" className="element__button"></button>
          </div>
          <img className="element__image" alt="Кадр из фильма" src={filmIllustration12}/>
        </article>
      </>
      :
      <>
        <article className="element">
          <div className="element__description">
            <h2 className="element__title">33 слова о дизайне</h2>
            <span className="element__duration">1ч 47м</span>
            <button type="button" className="element__button element__button_type_delete"></button>
          </div>
          <img className="element__image" alt="Кадр из фильма" src={filmIllustration}/>
        </article>
        <article className="element">
          <div className="element__description">
            <h2 className="element__title">33 слова о дизайне</h2>
            <span className="element__duration">1ч 47м</span>
            <button type="button" className="element__button element__button_type_delete"></button>
          </div>
          <img className="element__image" alt="Кадр из фильма" src={filmIllustration2}/>
        </article>
        <article className="element">
          <div className="element__description">
            <h2 className="element__title">33 слова о дизайне</h2>
            <span className="element__duration">1ч 47м</span>
            <button type="button" className="element__button element__button_type_delete"></button>
          </div>
          <img className="element__image" alt="Кадр из фильма" src={filmIllustration3}/>
        </article>
      </>
      }
    </>
  )
};

export default MoviesCard;