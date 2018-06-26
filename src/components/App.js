import React, { Component } from 'react';
import '../styles/Form.css';
import { Link } from 'react-router-dom';

import fontawesome from '@fortawesome/fontawesome';
import FontAwesomeIcon from '@fortawesome/react-fontawesome';
import brands from '@fortawesome/fontawesome-free-brands';
import faHome from '@fortawesome/fontawesome-free-solid/faHome';
import faPlusSquare from '@fortawesome/fontawesome-free-solid/faPlusSquare';
import faFutbol from '@fortawesome/fontawesome-free-solid/faFutbol';
import faCoffee from '@fortawesome/fontawesome-free-solid/faCoffee';
import faLeaf from '@fortawesome/fontawesome-free-solid/faLeaf';

fontawesome.library.add(brands, faHome, faPlusSquare, faCoffee, faFutbol, faLeaf);

class App extends Component {
  render() {
    return (
      <nav className="container">
        <ul className="list-stripped">
          <li><Link to="home" className="home"><FontAwesomeIcon icon="home" /><span>Home</span></Link></li>
          <li><Link to="health" className="health"><FontAwesomeIcon icon="plus-square" /><span>Health</span></Link></li>
          <li><Link to="food" className="food"><FontAwesomeIcon icon="coffee" /><span>Food</span></Link></li>
          <li><Link to="activities" className="activities"><FontAwesomeIcon icon="futbol" /><span>Activities</span></Link></li>
          <li><Link to="wellbeing" className="wellbeing"><FontAwesomeIcon icon="leaf" /><span>Wellbeing</span></Link></li>
        </ul>
      </nav>
    );
  }
}

export default App;
