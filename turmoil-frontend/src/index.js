// turmoil-init
import './js/turmoil-init';

// react
import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import { createRoot } from 'react-dom/client';

// redux
import { Provider } from 'react-redux';
import { IntlProvider } from 'react-intl';
import store from './js/redux/store/index';

// localization
import localeEn from './translations/en.json';
import localePl from './translations/pl.json';

// application
import Turmoil from './components/Turmoil';

// ========================================

const data = {
  en: localeEn,
  pl: localePl,
};

const language = navigator.language.split(/[-_]/)[0];

const container = document.getElementById('root');
const root = createRoot(container); // createRoot(container!) if you use TypeScript

root.render(
  // <React.StrictMode>
  <Provider store={store}>
    <IntlProvider locale={language} messages={data[language]}>
      <BrowserRouter>
        <Turmoil />
      </BrowserRouter>
    </IntlProvider>
  </Provider>,
  // </React.StrictMode>,
);
