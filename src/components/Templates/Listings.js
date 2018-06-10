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
class Listings extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      page: window.location.href.split('/').slice(-1)[0],
      results: []
    };

    this.loadFilters = this.loadFilters.bind(this);
  }

  getCategory(cat) {
    // Basic Needs
    // Family / Whanau Services
    // Health
    // Child Care
    // Parents and Caregivers
    switch(cat) {
    case 'home':
      return 'Family / Whanau Services, Child Care, Parents and Caregivers';
    case 'health':
      return 'Health';
    case 'food':
      return '';
    case 'activities':
      return '';
    case 'wellbeing':
      return 'Basic Needs';
    default:
      return '';
    }
  }

  loadFilters(){
    const GLOBAL_FILTER = 'community services card';
    const RESOURCE_ID = process.env.REACT_APP_API_RESOURCE_ID;
    const API_PATH = process.env.REACT_APP_API_PATH;
    const CATEGORY = this.getCategory(this.state.page);
    let fields = '*';

    let where = `WHERE "SERVICE_DETAIL" LIKE '%${GLOBAL_FILTER}%'
    AND "LEVEL_1_CATEGORY" = '${CATEGORY}'
    `;
    let whereArray = `WHERE "SERVICE_DETAIL" LIKE '%${GLOBAL_FILTER}%'
    &&|| "LEVEL_1_CATEGORY" = '${CATEGORY.split(',')[0]}'
    &&|| "LEVEL_1_CATEGORY" = '${CATEGORY.split(',')[1]}'
    &&|| "LEVEL_1_CATEGORY" = '${CATEGORY.split(',')[2]}'
    `;
    // alert(CATEGORY.split(',')[0])

    let sql =`SELECT ${fields} FROM "${RESOURCE_ID}" ${CATEGORY.length > 1 ? whereArray : where}`;
    sql =  encodeURI(sql);
    let url = `${API_PATH}datastore_search_sql?sql=${sql}`;
    return axios.get(url).then((response)=>{
      this.setState({results: response.data.result.records});
    });
  }
    // let fields = '"LEVEL_1_CATEGORY" as name, COUNT(*) as num';
    // let where = `WHERE "SERVICE_DETAIL" LIKE '%${GLOBAL_FILTER}%'
    //   OR "SERVICE_TARGET_AUDIENCES" LIKE '%${GLOBAL_FILTER}%'
    //   OR "COST_DESCRIPTION" LIKE '%${GLOBAL_FILTER}%'
    //   OR "DELIVERY_METHODS" LIKE '%${GLOBAL_FILTER}%'`;
  
    // let sql =`SELECT ${fields} FROM "${RESOURCE_ID}" ${where} GROUP BY name ORDER BY name`;
  componentDidMount() {
    return this.loadFilters();
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
    return self.indexOf(value) === index;
    console.log('value.FSD_ID',value.FSD_ID)
    console.log('index',index)
    console.log('self',self)
    console.log('selfdd',self.indexOf(value))
}
  render(){
    document.querySelector('body').setAttribute('class',`${this.renderTheme(this.state.page)}-bg`);
    
    const { match: { params: { name } } , result } = this.props;
    // console.log('result', this.state.results)
    const resArr = [];
    this.state.results.filter(function(item){
      const i = resArr.findIndex(x => x.FSD_ID == item.FSD_ID);
      if(i <= -1){
        resArr.push({PROVIDER_NAME: item.PROVIDER_NAME, FSD_ID: item.FSD_ID, SERVICE_DETAIL: item.SERVICE_DETAIL});
      }
      return null;
    });
    // {console.log(data)}
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
              resArr.map((item, key) => {
                return <li key={key} className={`${this.renderTheme(this.state.page)}`}>
                  <a href={`#/${this.state.page}/${item.FSD_ID}`}>
                    <Image src="http://placekitten.com/200/300" alt="kitten" />
                    <span className="listing-details">
                      <h3>{item.PROVIDER_NAME}</h3>
                      <p>{this.text_truncate(item.SERVICE_DETAIL)}</p>
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

export default connect (mapStateToProps, actionCreators)(Listings);
