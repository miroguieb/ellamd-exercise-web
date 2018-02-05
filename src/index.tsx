import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { useStrict } from 'mobx';
import { Provider } from 'mobx-react';

import App from './App';
import registerServiceWorker from './registerServiceWorker';
import { PatientFormStore } from './stores';
import './index.css';

useStrict(true);

const rootStores = {
  patientFormStore: new PatientFormStore()
};

ReactDOM.render(
  <Provider {...rootStores} >
    <App />
  </Provider>,
  document.getElementById('root') as HTMLElement
);
registerServiceWorker();
