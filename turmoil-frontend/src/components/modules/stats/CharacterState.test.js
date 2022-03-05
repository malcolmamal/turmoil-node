import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { IntlProvider } from 'react-intl';
import CharacterState from './CharacterState';
import store from '../../../js/redux/store';
import localeEn from '../../../translations/en.json';

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(
    <Provider store={store}>
      <IntlProvider locale="en" messages={localeEn}>
        <CharacterState />
      </IntlProvider>
    </Provider>,
    div,
  );
});
