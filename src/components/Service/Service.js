import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import fontawesome from '@fortawesome/fontawesome';
import brands from '@fortawesome/fontawesome-free-brands';
import home from '@fortawesome/fontawesome-free-solid/faHome';
import health from '@fortawesome/fontawesome-free-solid/faPlusSquare';
import activities from '@fortawesome/fontawesome-free-solid/faFutbol';
import food from '@fortawesome/fontawesome-free-solid/faCoffee';
import wellbeing from '@fortawesome/fontawesome-free-solid/faLeaf';

fontawesome.library.add(brands, home, health, activities, food, wellbeing);
class Service extends Component {

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
