import React from 'react';
import Image from '../Image';
import {Link} from 'react-router-dom';
import fontawesome from '@fortawesome/fontawesome';
import FontAwesomeIcon from '@fortawesome/react-fontawesome';
import brands from '@fortawesome/fontawesome-free-brands';
import home from '@fortawesome/fontawesome-free-solid/faHome';
import health from '@fortawesome/fontawesome-free-solid/faPlusSquare';
import activities from '@fortawesome/fontawesome-free-solid/faFutbol';
import food from '@fortawesome/fontawesome-free-solid/faCoffee';
import bookmark from '@fortawesome/fontawesome-free-solid/faBookmark';
fontawesome.library.add(brands, home, health, activities, food, bookmark);

class Service extends React.Component {
  constructor(props) {
    super(props);

    const loc = window.location.href.split('/');
    this.state = {
      page: loc.slice(-2)[0],
      service: loc.slice(-1)[0]
    };
  }

  renderTheme(state) {
    switch(state) {
    case state:
      return state;
    }
  }

  render() {
    return (
      <div className={`${this.renderTheme(this.state.page)}-bg listing service`}>
        <header className={`home-header compact`}>
          <Link to="/" className="back-link"><span className="arrow arrow-left arrow-sm"></span><span>Home</span><span className="aria-hidden">Navigate to home</span></Link>
        </header>
        <div className={`${this.renderTheme(this.state.page)} sub-header`}>
          <div className="container">
            <Image src="http://placekitten.com/200/300" />
            <header className={`${this.renderTheme(this.state.page)}`} style={{display: 'inline-block'}}>
              <FontAwesomeIcon icon="bookmark" />
              <h2>{this.state.service}</h2>
              <p>Wellington Sustainability Trust</p>
            </header>
          </div>
        </div>
        <div className="container-inner">
          <p>
            <strong>Do you have a cold home and a Community Services Card? Wellington Curtain Bank can help.</strong>
          </p>
          <iframe width="100%" src="https://www.youtube.com/embed/GsLB-M5bk00" frameborder="0" allow="autoplay; encrypted-media" allowfullscreen></iframe>

          <p>
          We offer families who have a Community Services Card free, lined curtains for their living rooms.</p>

 <p>If there are children, older people or people with health issues in the home, we can also make curtains for bedrooms.</p>

<p>Wellington Curtain Bank upcycles good quality curtains donated by the public to fit your windows and help you keep heat in, cold out and power bills down.</p>

<p>If you would like to donate your preloved curtains, please read this page for more info.
          </p>
        </div>
      </div>
    );
  }
}

export default Service;
