
import './Error404.scss';
import svg404 from '../../assets/404.svg';
import arrow404 from '../../assets/icons/Aerrow.svg';
import { Link } from 'react-router-dom';

function Error404() {
  return (
    <div className="notfound">
      <div className="notfound_404">
        <img className="notfound_404-svg" src={svg404} alt="404" />
        <h1>Page not found</h1>
        <p>The page you are looking for doesn&lsquo;t exist or has been moved</p>
        <div className="notfound_button">
          <Link to="/">Go to Homepage</Link> <img src={arrow404} alt="" />
        </div>
      </div>
    </div>
  );
}

export default Error404;
