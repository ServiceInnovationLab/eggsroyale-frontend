import React from 'react';
import '../../styles/Footer.css';
import fontawesome from '@fortawesome/fontawesome';
import FontAwesomeIcon from '@fortawesome/react-fontawesome';
import brands from '@fortawesome/fontawesome-free-brands';
import faLocationArrow from '@fortawesome/fontawesome-free-solid/faLocationArrow';
import faSearch from '@fortawesome/fontawesome-free-solid/faSearch';
import faBookmark from '@fortawesome/fontawesome-free-solid/faBookmark';

fontawesome.library.add(brands, faLocationArrow, faSearch, faBookmark);

class Footer extends React.Component {

  render(){
    return (
      <div className="footer" aria-label="Footer" role="contentinfo">
        <div className="container">
          <nav>
            <ul className="list-stripped list-inline list-icons">
              <li><FontAwesomeIcon icon="location-arrow" /></li>
              <li><FontAwesomeIcon icon="search" /></li>
              <li><a href={window.location.href+'bookmarks'}><FontAwesomeIcon icon="bookmark" /></a></li>
            </ul>
          </nav>
        </div>
      </div>
    );
  }
}

export default Footer;
