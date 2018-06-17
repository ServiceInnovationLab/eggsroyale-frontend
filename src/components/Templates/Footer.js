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

  bookmark() {
    const location = window.location.href;
    const currentArr = localStorage.getItem("names");
    if(currentArr !== null) {
      const newArr = currentArr.split(',');
      newArr.push(location);
      if(newArr.includes(location)) {
        localStorage.setItem("names", newArr);
      }
    } else {
      localStorage.setItem("names", location);
    }
  }
  render(){
    return (
      <div className="footer" aria-label="Footer" role="contentinfo">
        <div className="container">
          <nav>
            {/* {console.log('cookies', document.cookie)} */}
            <ul className="list-stripped list-inline list-icons">
              <li><a href={window.location.href+'map'}><FontAwesomeIcon icon="location-arrow" /></a></li>
              <li><FontAwesomeIcon icon="search" /></li>
              <li><span onClick={()=>this.bookmark()}><FontAwesomeIcon icon="bookmark" /></span></li>
            </ul>
          </nav>
        </div>
      </div>
    );
  }
}

export default Footer;
