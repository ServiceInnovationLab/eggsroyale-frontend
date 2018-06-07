import React from 'react';
// import '../../styles/Listings.css';


class Listings extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      page: window.location.href.split('/').slice(-1)[0]
    };
  }
  render(){
    
    return (
      <p>{this.state.page} page</p>
    );
  }
}

export default Listings;
