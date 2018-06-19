import React from 'react';
import Image from '../Image';
import fontawesome from '@fortawesome/fontawesome';
import FontAwesomeIcon from '@fortawesome/react-fontawesome';
import brands from '@fortawesome/fontawesome-free-brands';
import home from '@fortawesome/fontawesome-free-solid/faHome';
import health from '@fortawesome/fontawesome-free-solid/faPlusSquare';
import activities from '@fortawesome/fontawesome-free-solid/faFutbol';
import food from '@fortawesome/fontawesome-free-solid/faCoffee';
import bookmark from '@fortawesome/fontawesome-free-solid/faBookmark';
import axios from 'axios';
fontawesome.library.add(brands, home, health, activities, food, bookmark);

class Service extends React.Component {
  constructor(props) {
    super(props);

    const loc = window.location.href.split('/');
    this.state = {
      page: loc.slice(-2)[0],
      service: loc.slice(-1)[0],
      results: []
    };
  }

  loadService(){
    // const GLOBAL_FILTER = 'community services card';
    const RESOURCE_ID = process.env.REACT_APP_API_RESOURCE_ID;
    const API_PATH = process.env.REACT_APP_API_PATH;
    // const CATEGORY = this.getCategory(this.state.page);
    let fields = '*';

    let where = `WHERE "FSD_ID" = '${this.state.service}'`;

    // alert(CATEGORY.split(',')[0])

    let sql =`SELECT DISTINCT ${fields} FROM "${RESOURCE_ID}" ${where} LIMIT 1`;
    sql =  encodeURI(sql);
    let url = `${API_PATH}datastore_search_sql?sql=${sql}`;
    return axios.get(url).then((response)=>{
      this.setState({results: response.data.result.records[0]});
    });
  }

  renderTheme(state) {
    switch(state) {
    case state:
      return state;
    default:
      return 'home';
    }
  }
  componentDidMount() {
    return this.loadService();
  }
  render() {
    return (
      <div className={`${this.renderTheme(this.state.page)}-bg listing service`}>
        <Header />
        <Subheader
          theme={this.renderTheme(this.state.page)}
          image="http://placekitten.com/200/300"
          service={this.state.results.PROVIDER_NAME}
          serviceDesc={this.state.results.SERVICE_DETAIL}
          page={this.state.page}
        />
        <div className="container-inner">
          <p>{this.state.results.ORGANISATION_PURPOSE}</p>
          <p>{this.state.results.PROVIDER_CONTACT_AVAILABILITY}</p>
          <p>{this.state.results.PHYSICAL_ADDRESS}</p>
          <p>{this.state.results.PHYSICAL_DISTRICT}</p>
          <p>{this.state.results.PHYSICAL_REGION}</p>
          <p>{this.state.results.POSTAL_ADDRESS}</p>
        </div>
      </div>
    );
  }
}

const Header = () => {
  return (
    <header className="home-header compact">
      <a href="/" className="back-link">
        <span className="arrow arrow-left arrow-sm"></span>
        <FontAwesomeIcon icon="home" />
        <span><p>Home</p></span>
        <span className="aria-hidden">Navigate to home</span>
      </a>
    </header>
  );
};

function addBookmark(page) {
  let bookmarks = window.localStorage.getItem("csc-bookmarks");
  return bookmarks+`,${window.location.href}`;
}

const Subheader = props => {
  return (
    <div className={`${props.theme} sub-header`}>
      <div className="container">
        <Image src={props.image} alt={props.alt} />
        <header className={props.theme} style={{display: 'inline-block'}}>
          <FontAwesomeIcon icon="bookmark" onClick={()=>window.localStorage.setItem('csc-bookmarks', addBookmark(props.page))} />
          <h2>{props.service}</h2>
          <p>{props.serviceDesc}</p>
        </header>
      </div>
    </div>
  );
};

export default Service;
