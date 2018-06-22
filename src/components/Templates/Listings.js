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
import { Link } from 'react-router-dom';
import {loadData, mergeData} from '../../actions/index';

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
    this.setState({results: loadData(this.state.page)});
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
        <ListingHeader
          page={this.state.page}
          theme={this.renderTheme(this.state.page)}
          icon={this.renderIcon(this.state.page)}
        />
        <div className="container">
          <ListItems
            data={mergeData(services, this.state.results)}
            theme={this.renderTheme(this.state.page)}
            page={this.state.page}
          />
        </div>
      </div>
    );
  }
}

const ListItems = props => {
  return <ul className="list-stripped">
    {services.length > 0 && services.filter(x => x.CATEGORY === props.page).map((item, key) => {
      return <li key={key} className={props.theme}>
        <a href={`#/${props.page}/0000${key+1}`} className="service">
          <Image src="http://placekitten.com/200/300" alt="kitten" />
          <span className="listing-details">
            <h3>{item.SERVICE_NAME}</h3>
            <p>{item.PROVIDER_NAME}</p>
          </span>
        </a>
      </li>;
    })}
  </ul>;
};

const ListingHeader = props => {
  return <header className={props.theme}>
    <Link to="/" className="back-link">
      <span className="arrow arrow-left"></span>
      <span className="aria-hidden">Navigate to home</span>
    </Link>master
    <FontAwesomeIcon icon={props.icon} />
    <h2>{props.page}</h2>
  </header>;
};

const mapStateToProps=(state)=>{
  return state;
};

export default connect (mapStateToProps, actionCreators)(Listings);
