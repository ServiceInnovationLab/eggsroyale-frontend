import React from 'react';
import MapResults from '../Map/MapResults';
import axios from 'axios';

class Map extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      results: []
    }
  }
  loadFilters(){
    const GLOBAL_FILTER = 'community services card';
    const RESOURCE_ID = process.env.REACT_APP_API_RESOURCE_ID;
    const API_PATH = process.env.REACT_APP_API_PATH;
    let fields = '*';
    let where = `WHERE "SERVICE_DETAIL" LIKE '%${GLOBAL_FILTER}%'`;
    let sql =`SELECT ${fields} FROM "${RESOURCE_ID}" ${where}`;
    sql =  encodeURI(sql);
    let url = `${API_PATH}datastore_search_sql?sql=${sql}`;
    return axios.get(url).then((response)=>{
      this.setState({results: response.data.result.records});
    });
  }
  componentDidMount() {
    return this.loadFilters();
  }
  render() {
    return (
      <div>
        <MapResults map_results={this.state.results} />
      </div>
    );
  }
}

export default Map;