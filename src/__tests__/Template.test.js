import React from 'react';
import renderer from 'react-test-renderer';
import Service from '../components/Templates/Service';
import Listings from '../components/Templates/Listings';

const Components = [
  Service,
  Listings
];
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import reducers from '../reducers/index';
import thunk from 'redux-thunk';
const store = createStore(reducers, applyMiddleware(thunk));

describe('components', function() {
  'use strict';
  Components.map(item=> {
    describe(`<${item} />`, function() {
      it('renders correctly', function() {
        const TagName = item;
        let tree = renderer.create(<Provider store={store}><TagName /></Provider>).toJSON();
        expect(tree).toMatchSnapshot();
      });
    });
  });
});
