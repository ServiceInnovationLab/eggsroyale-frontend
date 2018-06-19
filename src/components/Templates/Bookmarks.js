import React from 'react';
import Image from '../Image';
import { connect } from 'react-redux';
import * as actionCreators from '../../actions/index';
import fontawesome from '@fortawesome/fontawesome';
import FontAwesomeIcon from '@fortawesome/react-fontawesome';
import brands from '@fortawesome/fontawesome-free-brands';
import home from '@fortawesome/fontawesome-free-solid/faHome';
import health from '@fortawesome/fontawesome-free-solid/faPlusSquare';
import activities from '@fortawesome/fontawesome-free-solid/faFutbol';
import food from '@fortawesome/fontawesome-free-solid/faCoffee';
import wellbeing from '@fortawesome/fontawesome-free-solid/faLeaf';
import axios from 'axios';
// import { connect } from 'react-redux';
// import * as actionCreators from '../actions/index';
fontawesome.library.add(brands, home, health, activities, food, wellbeing);
class Bookmarks extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      page: window.location.href.split('/').slice(-1)[0]
    };
  }

  renderTheme(state) {
    switch(state) {
    case state:
      return state;
    default:
      return 'home';
    }
  }

  renderIcon(state) {
    switch(state) {
    case 'home':
      return 'home';
    case 'food':
      return 'coffee';
    case 'activities':
      return 'futbol';
    case 'wellbeing':
      return 'leaf';
    case 'health':
      return 'plus-square';
    default:
      return 'home';
    }
  }

  render(){
    document.querySelector('body').setAttribute('class',`${this.renderTheme(this.state.page)}-bg`);

    return (
      <div className={`${this.renderTheme(this.state.page)}-bg listing`}>
        <header className={this.renderTheme(this.state.page)}>
          <a href="/" className="back-link"><span className="arrow arrow-left"></span><span className="aria-hidden">Navigate to home</span></a>
          <FontAwesomeIcon icon={this.renderIcon(this.state.page)} />
          <h2>{this.state.page}</h2>
        </header>
        <div className="container">
          <ul className="list-stripped">
            {
              window.localStorage.names.split(',').map((item, key) => {
                return <li key={key} className={`${this.renderTheme('home')}`}>
                  <a href={`#/${this.state.page}/${item.FSD_ID}`}>
                    <span style={{marginLeft: 0}}>
                      <h3><a href={item} style={{color: '#fff'}}>{item}</a></h3>
                    </span>
                  </a>
                </li>;
              })
            }
          </ul>
        </div>
      </div>
    );
  }
}

const mapStateToProps=(state)=>{
  return state;
};

export default connect (mapStateToProps, actionCreators)(Bookmarks);
