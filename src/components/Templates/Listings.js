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
// import axios from 'axios';
import {loadData, mergeData} from '../../actions/index';
// import { connect } from 'react-redux';
// import * as actionCreators from '../actions/index';

import * as services from '../../csv.json';

fontawesome.library.add(brands, home, health, activities, food, wellbeing);
class Listings extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      page: window.location.href.split('/').slice(-1)[0],
      results: []
    };
  }

  componentDidMount() {
    // return loadData(this.state.page);
    // console.log('in listings', loadData(this.state.page))
    this.setState({results: loadData(this.state.page)})
    console.log(this.state.page)
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

  text_truncate(str, length, ending) {
    if (length == null) {
      length = 100;
    }
    if (ending == null) {
      ending = '...';
    }
    if (str.length > length) {
      return str.substring(0, length - ending.length) + ending;
    } else {
      return str;
    }
  }

  onlyUnique(value, index, self) {
    const unique = self.indexOf(value) === index;
    return unique;
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
            {mergeData(services, this.state.results).map((item, key) => {
                return <li key={key} className={`${this.renderTheme(this.state.page)}`}>
                  <a href={`#/${this.state.page}/${item.FSD_ID}`}>
                    <Image src="http://placekitten.com/200/300" alt="kitten" />
                    <span className="listing-details">
                      <h3>{item.SERVICE_NAME} - {item.PROVIDER_NAME}</h3>
                      <p>{this.text_truncate(item.SERVICE_DETAIL)}</p>
                    </span>
                  </a>
                </li>;
              })}
          </ul>
        </div>
      </div>
    );
  }
}

const mapStateToProps=(state)=>{
  return state;
};

export default connect (mapStateToProps, actionCreators)(Listings);