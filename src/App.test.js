import React from "react";
// import ReactDOM from "react-dom";
import { render, screen, fireEvent, cleanup, waitFor } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';

import App from './App';
import { GOTContextProvider } from './store/GOT-context';

afterEach(cleanup);

test('renders app and shows empty list message', () => {
  render(
    <BrowserRouter>
      <App />
    </BrowserRouter>
  );
  const linkElement = screen.getByText(/No/i);
  // console.log(linkElement);
  expect(linkElement).toBeInTheDocument();
});

describe('render with context', () => {
  let btnElement, listElement;
  beforeEach(async () => {
    render(
      <GOTContextProvider>
        <BrowserRouter>
          <App />
        </BrowserRouter>
      </GOTContextProvider>
    );
    btnElement = await waitFor(() => screen.getAllByRole('button', {
      name: /more info/i
    }));
    listElement = await waitFor(() => screen.getAllByRole('listitem'));
  });

  afterAll(() => {
    cleanup();
  })

  it('more info button present', async () => {
    expect(btnElement).not.toHaveLength(0);
  });

  it('list present', async () => {
    expect(listElement).not.toHaveLength(2);
  })
});

test('name search page loads', () => {
  render(
    <GOTContextProvider>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </GOTContextProvider>
  );
  fireEvent.click(screen.getByText(/Name/i));
  const inpElement = screen.getByRole('textbox');
  expect(inpElement).toBeInTheDocument();
});