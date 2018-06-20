import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import '../../styles/Service.css';
import fontawesome from '@fortawesome/fontawesome';
import brands from '@fortawesome/fontawesome-free-brands';
import home from '@fortawesome/fontawesome-free-solid/faHome';
import health from '@fortawesome/fontawesome-free-solid/faPlusSquare';
import activities from '@fortawesome/fontawesome-free-solid/faFutbol';
import food from '@fortawesome/fontawesome-free-solid/faCoffee';
import wellbeing from '@fortawesome/fontawesome-free-solid/faLeaf';
fontawesome.library.add(brands, home, health, activities, food, wellbeing);
class Service extends Component {
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
  render() {
    return (
      <li className='home'>
        <Link to={`home/${this.props.results.FSD_ID}`}>
          <span className="listing-details" style={{marginLeft: '10px'}}>
            <h3>{this.props.results.PROVIDER_NAME}</h3>
            <p>{this.props.results.SERVICE_DETAIL}</p>
          </span>
        </Link>
      </li>
    );
  }
}

export default Service;
