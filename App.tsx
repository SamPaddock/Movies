import 'react-native-gesture-handler';
import 'intl-pluralrules';
import React from 'react';

import { NavigationContainer } from '@react-navigation/native';
import { PersistGate } from 'redux-persist/integration/react';

import { Provider } from 'react-redux';
import { I18nextProvider } from 'react-i18next';
import i18n from './src/helper/language';
import { store, persistor } from './src/helper/redux/store';

import NavigationStack from './src/helper/navigation/navigation';

function App(): React.JSX.Element {

  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <I18nextProvider i18n={i18n}>
          <NavigationContainer>
            <NavigationStack />
          </NavigationContainer>
        </I18nextProvider>
      </PersistGate>
    </Provider>
  );
}

export default App;
