import './styles/index.css';
import AppCon from './container/app-container';
import Footer from './components/Templates/Footer';
import React from 'react';
import ReactDOM from 'react-dom';
import reducers from './reducers/index';
import ServiceInfo from './components/Service/ServiceInfo';
import thunk from 'redux-thunk';
import { createStore, applyMiddleware } from 'redux';
import { HashRouter, Route, Switch } from 'react-router-dom';
import { Provider } from 'react-redux';

const store = createStore(reducers, applyMiddleware(thunk));

class App extends React.Component {
  render(){
    return (
      <HashRouter>
        <div>
          <h1 className="container-fluid">Eggs Royale</h1>
          <Switch>
            <Route exact path="/" component={AppCon} />
            <Route path="/category/:category" component={AppCon} />
            <Route path="/service/:name" component={ServiceInfo} />
          </Switch>
        </div>
      </HashRouter>
    );
  }
}

ReactDOM.render(<Provider store={store}><App /></Provider>, document.getElementById('root'));
ReactDOM.render(<Footer />, document.getElementById('footer'));
