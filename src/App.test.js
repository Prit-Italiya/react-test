import React from 'react';
import renderer from 'react-test-renderer';

import {Provider} from 'react-redux';
import store from "./store/store";
import App from './App';

test('snapshot renders', () => {
    const component = renderer.create(<Provider store={store}><App/></Provider>);
    let tree = component.toJSON();
    expect(tree).toMatchSnapshot();
});