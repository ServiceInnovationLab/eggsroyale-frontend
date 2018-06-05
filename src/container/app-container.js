import React, { Component } from 'react';
import App from '../components/App';
import { connect } from 'react-redux';
import * as actionCreators from '../actions/index';

import '../styles/App.css';

import fontawesome from '@fortawesome/fontawesome'
import FontAwesomeIcon from '@fortawesome/react-fontawesome'
import brands from '@fortawesome/fontawesome-free-brands'
import faHome from '@fortawesome/fontawesome-free-solid/faHome'
import faPlusSquare from '@fortawesome/fontawesome-free-solid/faPlusSquare'
import faFutbol from '@fortawesome/fontawesome-free-solid/faFutbol'
import faCoffee from '@fortawesome/fontawesome-free-solid/faCoffee'
import faLeaf from '@fortawesome/fontawesome-free-solid/faLeaf'

fontawesome.library.add(brands, faHome, faPlusSquare, faCoffee, faFutbol, faLeaf)

class AppCon extends Component {

  render() {
    return (
      <div>
        <header>
          <div class="container">
            <h1>Community Rewards</h1>
          </div>
        </header>
        <main>
          <nav className="container">
            <ul className="list-stripped">
              <li><a href="" className="home"><FontAwesomeIcon icon="home" /><span>Home</span></a></li>
              <li><a href="" className="health"><FontAwesomeIcon icon="plus-square" /><span>Health</span></a></li>
              <li><a href="" className="food"><FontAwesomeIcon icon="coffee" /><span>Food</span></a></li>
              <li><a href="" className="activities"><FontAwesomeIcon icon="futbol" /><span>Activities</span></a></li>
              <li><a href="" className="wellbeing"><FontAwesomeIcon icon="leaf" /><span>Wellbeing</span></a></li>
            </ul>
          </nav>
        </main>
        <footer>
        </footer>
      </div>
    );
  }
}

const mapStateToProps=(state)=>{
  return state;
};

export default connect (mapStateToProps, actionCreators)(AppCon);
