import { useHistory } from 'react-router-dom'; 
import './PageError.css'

function PageError() {
  const history = useHistory();

  return(
    <div className='error-page'>
      <h1 className='error-page__title'>404</h1>
      <h2 className='error-page__subtitle'>Страница не найдена</h2>
      <button className='error-page__button' onClick={() => history.goBack()}>Назад</button>
    </div>
  )
};

export default PageError;