import React, { Component } from 'react';
import { Route } from 'react-router-dom';
import {connect} from 'react-redux';
import * as actionCreators from '../../actions/index';
import MapResults from '../Map/MapResults';
import Service from '../../components/Service/Service';
import '../../styles/Form.css';

import fontawesome from '@fortawesome/fontawesome';
import brands from '@fortawesome/fontawesome-free-brands';
import faHome from '@fortawesome/fontawesome-free-solid/faHome';
import faPlusSquare from '@fortawesome/fontawesome-free-solid/faPlusSquare';
import faFutbol from '@fortawesome/fontawesome-free-solid/faFutbol';
import faCoffee from '@fortawesome/fontawesome-free-solid/faCoffee';
import faLeaf from '@fortawesome/fontawesome-free-solid/faLeaf';


fontawesome.library.add(brands, faHome, faPlusSquare, faCoffee, faFutbol, faLeaf);

let inputchanged = false;

class Search extends Component {

  constructor() {
    super();
    this.state = {
      showMap: false,
      latlng: [],
      keyword: ''
    };
    this.resultButton = this.resultButton.bind(this);
    this.resultCountButton = this.resultCountButton.bind(this);
    this.keywordBlur = this.keywordBlur.bind(this);
    this.onKeywordChange = this.onKeywordChange.bind(this);
    this.formSubmit = this.formSubmit.bind(this);
    this.correctLatLng = this.correctLatLng.bind(this);
    this.resetForm = this.resetForm.bind(this);
  }

  debounce(func, wait, immediate) {
    var timeout;
    return function() {
      var context = this, args = arguments;
      var later = function() {
        timeout = null;
        if (!immediate) func.apply(context, args);
      };
      var callNow = immediate && !timeout;
      clearTimeout(timeout);
      timeout = setTimeout(later, wait);
      if (callNow) func.apply(context, args);
    };
  }

  componentWillMount () {
    this.radiusChange = this.debounce(this.radiusChange,200);
    this.setState({keyword: this.props.searchVars.keyword});
  }

  resultButton () {
    if(this.props.results.length > 0){
      return <button className="btn-toggle" onClick={() => {
        this.setState({ showMap: !this.state.showMap}); }
      }>{this.state.showMap ? 'Show List' : 'Toggle Map'}</button>;
    }
  }

  resultCountButton () {
    if(!this.props.itemsLoading && this.props.hasSearched){
      return <p className="results-desc">
        {this.props.noSearchVars && <span>No search parameters supplied</span>}
        {!this.props.noSearchVars && this.resultCountButtonText()}
        {!this.props.noSearchVars && this.resultButton()}
      </p>;
    }
  }

  resultCountButtonText (){
    let desc = 'Found '+this.props.results.length+' ';
    if(this.props.totalResults && this.props.results.length === 100 && this.props.totalResults*1 > 100){
      desc += 'of '+this.props.totalResults*1+' ';
    }
    desc += 'result'+(this.props.totalResults*1 !== 1 ? 's' : '');
    return desc;
  }

  keywordBlur(e){
    if(inputchanged || e.target.value === ''){
      const clone = {...this.props.searchVars};
      clone.keyword = e.target.value;
      clone.addressLatLng = this.correctLatLng();
      this.props.loadResults(clone);
    }
  }

  onKeywordChange(value){
    this.setState({keyword: value});
  }

  enterPressed(e) {
    inputchanged = true;
    var code = e.keyCode || e.which;
    if(code === 13) {
      inputchanged = false;
      const clone = {...this.props.searchVars};
      clone.keyword = (e.target.value === '') ? null : e.target.value;
      clone.addressLatLng = this.correctLatLng();
      this.props.loadResults(clone);
    }
  }

  radiusChange(value){
    const clone = {...this.props.searchVars};
    const callback = this.props.loadResults;
    clone.radius = value*1;
    setImmediate(function() {
      callback(clone);
    });
  }

  formSubmit(e) {
    e.preventDefault();
    this.setState({latlng: this.props.searchVars.addressLatLng});
    const clone = {...this.props.searchVars};
    clone.addressLatLng = this.correctLatLng();
    clone.keyword = e.target.keyword.value;
    this.props.loadResults(clone);
  }

  correctLatLng(){
    return (this.props.searchVars.addressLatLng === undefined ? this.state.latlng : this.props.searchVars.addressLatLng);
  }

  resetForm(){
    this.setState({latlng: {},keyword: ''});
    this.props.loadResults({
      category: '',
      keyword: '',
      address: '',
      addressLatLng: {},
      radius: 50000
    });
  }

  render() {
    return (
      <div>
        <form className="form" onSubmit={e => this.formSubmit(e)}>
          <input value={this.state.keyword} type="search" name="keyword" onBlur={this.keywordBlur.bind(this)} onKeyPress={this.enterPressed.bind(this)} onChange={e => this.onKeywordChange(e.target.value)} placeholder="Enter topic or organisation" />
          <button type="submit">Search</button>
          {(!this.props.noSearchVars && this.props.hasSearched) && <Route render={({ history,location}) => (<button type="button" onClick={()=> {(location.pathname !== '/' && history.push(''));this.resetForm();}}>Reset form</button>)} />}
        </form>
        <div className={'results' + (this.props.itemsLoading ? ' loading' : '')}>
          {this.resultCountButton()}
          { !this.props.itemsLoading && this.state.showMap && <MapResults className="container-fluid" LatLng={this.props.searchVars.addressLatLng} map_results={this.props.results} />}
          { !this.props.itemsLoading && !this.state.showMap && this.props.results.map((data,index)=>
            <Result key={index} data={data} changeCategory={this.props.changeCategory} searchVars={this.props.searchVars} loadResults={this.props.loadResults}/>)}
        </div>
      </div>
    );
  }
}

const Result = props => {
  return <div className="home-bg listing">
    <div className="container">
      <ul className="list-stripped" style={{paddingBottom: 0}}>
        <Service results={props.data} changeCategory={props.changeCategory} searchVars={props.searchVars} serviceId={props.data.FSD_ID} loadResults={props.loadResults} />
      </ul>
    </div>
  </div>;
};

function mapStateToProps(state,ownProps) {
  const clone = {...state.searchVars};
  if(!state.searchVars.category && ownProps.startCategory){
    /* for some unidentified reason ownProps.startCategory is returning a string */
    clone.category = (ownProps.startCategory === 'undefined') ? '' : ownProps.startCategory;
  }
  return {
    filters: state.filter,
    results: state.results,
    showMap: state.showMap,
    searchVars: clone,
    noSearchVars: state.noSearchVars,
    totalResults: state.totalResults,
    itemsLoading: state.itemsLoading,
    hasSearched: state.hasSearched
  };
}

export default connect(mapStateToProps, actionCreators)(Search);
