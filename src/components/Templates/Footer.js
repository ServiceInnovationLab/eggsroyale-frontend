import React from 'react';
import '../../styles/Footer.css';
import fontawesome from '@fortawesome/fontawesome';
import FontAwesomeIcon from '@fortawesome/react-fontawesome';
import brands from '@fortawesome/fontawesome-free-brands';
import faLocationArrow from '@fortawesome/fontawesome-free-solid/faLocationArrow';
import faSearch from '@fortawesome/fontawesome-free-solid/faSearch';
import faBookmark from '@fortawesome/fontawesome-free-solid/faBookmark';
import { Link } from 'react-router-dom';

fontawesome.library.add(brands, faLocationArrow, faSearch, faBookmark);

class Footer extends React.Component {

  render(){
    return (
      <div className="footer" aria-label="Footer" role="contentinfo">
        <div className="container">
          <nav>
            <ul className="list-stripped list-inline list-icons">
              <li><Link to={'map'}><FontAwesomeIcon icon="location-arrow" /></Link></li>
              <li><Link to={'/search'}><FontAwesomeIcon icon="search" /></Link></li>
            </ul>
          </nav>
        </div>
      </div>
    );
  }
}

export default Footer;
