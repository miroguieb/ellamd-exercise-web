import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { useStrict } from 'mobx';
import { Provider } from 'mobx-react';

import App from './App';
import registerServiceWorker from './utils/registerServiceWorker';
import { PATIENT_FORM_STORE } from './constants/stores';
import { PatientFormStore } from './stores';
import './index.css';

useStrict(true);

const patientFormStore = new PatientFormStore();

patientFormStore.loadIngredients();
patientFormStore.loadFormulations();

const rootStores = {
  [PATIENT_FORM_STORE]: patientFormStore
};

ReactDOM.render(
  <Provider {...rootStores} >
    <App />
  </Provider>,
  document.getElementById('root') as HTMLElement
);
registerServiceWorker();
