import React, {Fragment} from 'react';
import Image from '../Image';
import fontawesome from '@fortawesome/fontawesome';
import FontAwesomeIcon from '@fortawesome/react-fontawesome';
import brands from '@fortawesome/fontawesome-free-brands';
import home from '@fortawesome/fontawesome-free-solid/faHome';
import health from '@fortawesome/fontawesome-free-solid/faPlusSquare';
import activities from '@fortawesome/fontawesome-free-solid/faFutbol';
import food from '@fortawesome/fontawesome-free-solid/faCoffee';
import bookmark from '@fortawesome/fontawesome-free-solid/faBookmark';
import {mergeData} from '../../actions/index';
import { BrowserRouter as Router, Link } from 'react-router-dom';
import * as services from '../../csv.json';
import {renderTheme} from './Theme';

fontawesome.library.add(brands, home, health, activities, food, bookmark);

class Service extends React.Component {
  constructor(props) {
    super(props);

    const loc = window.location.href.split('/');
    this.state = {
      page: loc.slice(-2)[0],
      id: loc.slice(-1)[0],
      service: loc.slice(-1)[0],
      results: []
    };
  }

  render() {
    const data = mergeData(services, this.state.results).filter(x => x.FSD_ID === this.state.id)[0];
    return (
      <div className={`${renderTheme(this.state.page)}-bg listing service`}>
        <Header />
        {data !== undefined && <div>
          <Subheader
            theme={renderTheme(this.state.page)}
            image="http://placekitten.com/200/300"
            service={data.SERVICE_NAME}
            serviceDesc={data.PROVIDER_NAME}
          />
          <div className="container-inner">
            <p>{data.SERVICE_DETAIL}</p>
            <DefinitionList data={data} />
          </div>
        </div>
        }
      </div>
    );
  }
}

const DefinitionList = props => {
  return <dl>
    <Definition
      term={'Website'}
      item={props.data.PROVIDER_WEBSITE_1}
    />
    <Definition
      term={'Email'}
      item={props.data.PUBLISHED_CONTACT_EMAIL_1}
    />

    <Definition
      term={'Address'}
      item={props.data.PHYSICAL_DISTRICT}
    />

    <Definition
      term={'Phone'}
      item={props.data.PUBLISHED_PHONE_1}
    />

    <Definition
      term={'Cost'}
      item={props.data.COST_TYPE}
    />
  </dl>;
};

const Definition = props => {
  return (
    <Fragment>
      {props.item && <Fragment>
        <dt>{props.term}:</dt>
        <dd>{props.item}</dd>
      </Fragment>}
    </Fragment>
  );
};

const Header = () => {
  return (
    <header className="home-header compact">
      <Router>
        <Link to="/" className="back-link">
          <span className="arrow arrow-left arrow-sm"></span>
          <FontAwesomeIcon icon="home" />
          <span><p>Home</p></span>
          <span className="aria-hidden">Navigate to home</span>
        </Link>
      </Router>
    </header>
  );
};

const Subheader = props => {
  return (
    <div className={`${props.theme} sub-header`}>
      <div className="container">
        <Image src={props.image} alt={props.alt} />
        <header className={props.theme}>
          <FontAwesomeIcon icon="bookmark" />
          <h2>{props.service}</h2>
          <p>{props.serviceDesc}</p>
        </header>
      </div>
    </div>
  );
};

export default Service;
