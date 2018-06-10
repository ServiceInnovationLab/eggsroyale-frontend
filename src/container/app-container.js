import React, { Component } from 'react';
import App from '../components/App';

import '../styles/App.css';

class AppCon extends Component {
  
  render() {
    // console.log('filters', this.props.loadResults('health'))
    return (
      <div>
        <main>
          <App filters={this.props.loadFilters} startCategory={decodeURIComponent(this.props.match.params.category)} />
        </main>
        <footer>
        </footer>
      </div>
    );
  }
}


export default AppCon;
