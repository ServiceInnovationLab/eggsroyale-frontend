import React from 'react';
import MapResults from '../Map/MapResults';
import axios from 'axios';
import * as services from '../../csv.json';

class Map extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      results: []
    };
  }

  render() {
    return (
      <div>
        <MapResults map_results={services} />
      </div>
    );
  }
}

export default Map;
