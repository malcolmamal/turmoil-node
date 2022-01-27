// turmoil-init
import './js/turmoil-init';

// react
import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';

// redux
import { Provider } from 'react-redux';
import { IntlProvider } from 'react-intl';
import store from './js/redux/store/index';

// localization
import localeEn from './translations/en.json';
import localePl from './translations/pl.json';

// application
import WrappedTurmoil from './components/WrappedTurmoil';

const data = {
  en: localeEn,
  pl: localePl,
};

const language = navigator.language.split(/[-_]/)[0];

// ========================================

ReactDOM.render(
  <Provider store={store}>
    <IntlProvider locale={language} messages={data[language]}>
      <BrowserRouter>
        <WrappedTurmoil />
      </BrowserRouter>
    </IntlProvider>
  </Provider>,
  document.getElementById('root'),
);
