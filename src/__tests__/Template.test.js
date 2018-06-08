import React from 'react';
import renderer from 'react-test-renderer';
import Service from '../components/Templates/Service';
import Listings from '../components/Templates/Listings';

const Components = [
  Service,
  Listings
];


describe('components', function() {
  'use strict';
  Components.map(item=> {
    describe(`<${item} />`, function() {
      it('renders correctly', function() {
        const TagName = item;
        let tree = renderer.create(<TagName />).toJSON();
        expect(tree).toMatchSnapshot();
      });
    });
  });
});
