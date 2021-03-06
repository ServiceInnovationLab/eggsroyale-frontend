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
import { HashRouter, Link } from 'react-router-dom';
import {loadData, mergeData} from '../../actions/index';
import * as services from '../../csv.json';
import {renderIcon, renderTheme} from './Theme';

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

  onlyUnique(value, index, self) {
    const unique = self.indexOf(value) === index;
    return unique;
  }

  render(){
    document.body.style.background = '#d4d4d4';
    return (
      <div className="body-bg">
        <ListingHeader
          page={this.state.page}
          theme={renderTheme(this.state.page)}
          icon={renderIcon(this.state.page)}
        />
        <div className="container">
          <ListItems
            data={mergeData(services, this.state.results)}
            theme={renderTheme(this.state.page)}
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
      return <li key={key}>
        <Link to={`${props.page}/0000${key+1}`} className="service listing-bg">
          <Image src="http://placekitten.com/200/300" alt="kitten" />
          <span className="listing-details">
            <h3 className={`${props.theme}-text`}>{item.SERVICE_NAME}</h3>
            <p>{item.PROVIDER_NAME}</p>

          </span>
        </Link>
      </li>;
    })}
  </ul>;
};

const ListingHeader = props => {
  return <header className={props.theme}>
    <HashRouter>
      <Link to="/#" className="back-link">
        <span className="arrow arrow-left"></span>
        <span className="aria-hidden">Navigate to home</span>
        <FontAwesomeIcon icon={props.icon} />
        <h2>{props.page.charAt(0).toUpperCase() + props.page.slice(1)}</h2>
      </Link>
    </HashRouter>
  </header>;
};

const mapStateToProps=(state)=>{
  return state;
};

export default connect (mapStateToProps, actionCreators)(Listings);
