import React from 'react';
import {Provider} from 'react-redux';
import {act, fireEvent, render, waitFor} from '@testing-library/react-native';

import config from '../config';
import LoginScreen from '../src/screens/LoginScreen';
import store from '../src/store/index';

global.fetch = jest.fn((username, password) =>
  fetch(config.LOGIN_URL, {
    method: 'POST',
    body: JSON.stringify({
      username: username,
      password: password,
    }),
    headers: {
      'Content-Type': 'application/json',
    },
  }).then(response => {
    if (username === 'candidate' && password === 'P@ssw0rd') {
      Promise.resolve({
        json: () =>
          Promise.resolve({
            accessToken:
              'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6ImNhbmRpZGF0ZSIsImlhdCI6MTY3MjM0NjUyNywiZXhwIjoxNjcyMzgyNTI3fQ.eIq1PNcjlTWkERiPSW1vBIJrVJMkY_E6FAqLc7Sl7p0',
          }),
      });
    } else {
      Promise.resolve({
        json: () => Promise.resolve({error: 'Please check your login credentials'}),
      });
    }
  }),
);

describe('login screen testing', () => {
  test('testing input', () => {
    const screen = render(
      <Provider store={store}>
        <LoginScreen />
      </Provider>,
    );
    const usernameInput = screen.getByPlaceholderText('username');
    const passwordInput = screen.getByPlaceholderText('password');
    const loginButton = screen.getByText('Login');
    expect(usernameInput).toBeTruthy();
    expect(passwordInput).toBeTruthy();
    expect(loginButton).toBeTruthy();
  });

  test('failed request login', async () => {
    const screen = render(
      <Provider store={store}>
        <LoginScreen />
      </Provider>,
    );
    const usernameInput = screen.getByPlaceholderText('username');
    const passwordInput = screen.getByPlaceholderText('password');
    const loginButton = screen.getByText('Login');
    await act(async () => {
      await fireEvent.changeText(usernameInput, 'joelle');
      await fireEvent.changeText(passwordInput, '12345');
    });
    jest.spyOn(global, 'fetch').mockImplementation(() =>
      Promise.resolve({
        json: () => Promise.resolve({usernameInput, passwordInput}),
      }),
    );
    await act(async () => {
      await fireEvent.press(loginButton);
    });
    waitFor(() => {
      expect(
        screen.getByText(error),
      ).toBeTruthy();
    });
  });

  test('disable button', () => {
    const screen = render(
      <Provider store={store}>
        <LoginScreen />
      </Provider>,
    );
    const usernameInput = screen.getByPlaceholderText('username');
    const passwordInput = screen.getByPlaceholderText('password');
    const loginButton = screen.getByText('Login');
    fireEvent.changeText(usernameInput, '');
    fireEvent.changeText(passwordInput, '');
    fireEvent.press(loginButton);
    expect(loginButton.props.accessibilityState).toStrictEqual({
      disabled: true
    });
  });

  test('disable button in case of loading', () => {
    const screen = render(
      <Provider store={store}>
        <LoginScreen />
      </Provider>,
    );
    const usernameInput = screen.getByPlaceholderText('username');
    const passwordInput = screen.getByPlaceholderText('password');
    const loginButton = screen.getByText('Login');
    fireEvent.changeText(usernameInput, 'joelle');
    fireEvent.changeText(passwordInput, '1234');
    fireEvent.press(loginButton);
    expect(loginButton.props.accessibilityState).toStrictEqual({
      disabled: true
    });
  });

  test('loading spinner', () => {
    const screen = render(
      <Provider store={store}>
        <LoginScreen />
      </Provider>,
    );
    const usernameInput = screen.getByPlaceholderText('username');
    const passwordInput = screen.getByPlaceholderText('password');
    const loginButton = screen.getByText('Login');
    const spinner = screen.getByTestId('spinner');
    fireEvent.changeText(usernameInput, 'candidate');
    fireEvent.changeText(passwordInput, 'P@ssw0pprd');
    fireEvent.press(loginButton);
    expect(spinner).toBeTruthy();
  });

});

