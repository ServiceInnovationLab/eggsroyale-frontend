import './styles/index.css';
import AppCon from './container/app-container';
import Listings from './components/Templates/Listings';
import Service from './components/Templates/Service';
import Footer from './components/Templates/Footer';
import Search from './components/Templates/Search';
import React from 'react';
import ReactDOM from 'react-dom';
import reducers from './reducers/index';
import thunk from 'redux-thunk';
import { createStore, applyMiddleware } from 'redux';
import { HashRouter, Route, Switch } from 'react-router-dom';
import { Provider } from 'react-redux';
import './styles/Header.css';
const store = createStore(reducers, applyMiddleware(thunk));

class App extends React.Component {
  render(){
    return (
      <HashRouter>
        <div>
          <header>
            <div className="container">
              <h1>Community Rewards</h1>
            </div>
          </header>
          <Switch>
            <Route exact path="/" component={AppCon} />
            <Route exact path="/home" component={Listings} />
            <Route exact path="/health" component={Listings} />
            <Route exact path="/wellbeing" component={Listings} />
            <Route exact path="/activities" component={Listings} />
            <Route exact path="/food" component={Listings} />
            <Route exact path="/:category/:id" component={Service} />
            <Route exact path="/search" component={Search} />
          </Switch>
        </div>
      </HashRouter>
    );
  }
}

ReactDOM.render(<Provider store={store}><App /></Provider>, document.getElementById('root'));
ReactDOM.render(<Footer />, document.getElementById('footer'));
