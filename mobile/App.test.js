import React from 'react';
import renderer from 'react-test-renderer';

import App from './App';
import ServiceLogginPage from './Component/ServiceLogginPage';
import Reactions from './Component/Reactions';
import Card from './Component/Card';
import HomePage from './Component/HomePage';
import Settings from './Component/Settings';

describe('<App />', () => {
  it('has 2 child', () => {
    const tree = renderer.create(<App />).toJSON();
    expect(tree.children.length).toBe(2);
  });

  it('renders correctly', () => {
    const tree = renderer.create(<App />).toJSON();
    expect(tree).toMatchSnapshot();
  });

});

describe('<ServiceLogginPage />', () => {
  it('has 5 child', () => {
    const tree = renderer.create(<ServiceLogginPage />).toJSON();
    expect(tree.children.length).toBe(5);
  });

  it('renders correctly', () => {
    const tree = renderer.create(<ServiceLogginPage />).toJSON();
    expect(tree).toMatchSnapshot();
  });

});

describe('<Reactions />', () => {
  it('has 2 child', () => {
    const tree = renderer.create(<Reactions />).toJSON();
    expect(tree.children.length).toBe(2);
  });

  it('renders correctly', () => {
    const tree = renderer.create(<Reactions />).toJSON();
    expect(tree).toMatchSnapshot();
  });

});

describe('<Card />', () => {
  it('has 1 child', () => {
    const tree = renderer.create(<Card />).toJSON();
    expect(tree.children.length).toBe(1);
  });

  it('renders correctly', () => {
    const tree = renderer.create(<Card />).toJSON();
    expect(tree).toMatchSnapshot();
  });

});

describe('<HomePage />', () => {
  it('has 2 child', () => {
    const tree = renderer.create(<HomePage />).toJSON();
    expect(tree.children.length).toBe(2);
  });

  it('renders correctly', () => {
    const tree = renderer.create(<HomePage />).toJSON();
    expect(tree).toMatchSnapshot();
  });

});

describe('<Settings />', () => {
  it('has 2 child', () => {
    const tree = renderer.create(<Settings />).toJSON();
    expect(tree.children.length).toBe(1);
  });

  it('renders correctly', () => {
    const tree = renderer.create(<Settings />).toJSON();
    expect(tree).toMatchSnapshot();
  });

});