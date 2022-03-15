import React from 'react';
import { getByTestId, render, screen } from '@testing-library/react';
import Home from './Home';

test('renders learn react link', () => {
  render(<Home />);
  
  expect(
    // eslint-disable-next-line testing-library/prefer-screen-queries
    getByTestId(document.documentElement, 'html-element'),
  ).toBeInTheDocument()
});
