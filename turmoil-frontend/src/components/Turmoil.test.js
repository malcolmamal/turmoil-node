import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { IntlProvider } from 'react-intl';
import { BrowserRouter } from 'react-router-dom';
import Turmoil from './Turmoil';
import store from '../js/redux/store';
import localeEn from '../translations/en.json';

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(
    <Provider store={store}>
      <IntlProvider locale="en" messages={localeEn}>
        <BrowserRouter>
          <div />
          <Turmoil />
        </BrowserRouter>
      </IntlProvider>
    </Provider>,
    div,
  );
});
