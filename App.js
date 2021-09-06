import React from 'react';
import {library} from '@fortawesome/fontawesome-svg-core';
import {fab} from '@fortawesome/free-brands-svg-icons';
import {
  faUser,
  faLock,
  faArrowLeft,
  faArrowRight,
} from '@fortawesome/free-solid-svg-icons';
import Providers from './navigation';
import { SafeAreaProvider } from 'react-native-safe-area-context';

library.add(fab, faUser, faLock, faArrowLeft, faArrowRight);

const App = () => {
    return <Providers />
  //  <SafeAreaProvider>
  // </SafeAreaProvider>
};

export default App;
