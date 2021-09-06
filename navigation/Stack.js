import React, {useContext, useState, useEffect, useRef} from 'react';
import {NavigationContainer} from '@react-navigation/native';
import auth from '@react-native-firebase/auth';
import {AuthContext} from './Context';

import LoginStack from './LoginStack';
import AppStack from './AppStack';
import {TabNavigation} from '../components/TabNavigation';
import analytics from '@react-native-firebase/analytics';

const Stack = () => {
  const {user, setUser} = useContext(AuthContext);
  const [initializing, setInitializing] = useState(true);
  const navigation = useRef();

  const onAuthStateChanged = (user) => {
    setUser(user);
    if (initializing) setInitializing(false);
  };

  useEffect(() => {
    const subscriber = auth().onAuthStateChanged(onAuthStateChanged);
    return subscriber; // unsubscribe on unmount
  }, []);

  if (initializing) return null;

  return (
    <NavigationContainer ref={navigation}>
      {user ? <TabNavigation /> : <LoginStack />}
    </NavigationContainer>
  );
};

export default Stack;
// export default Sentry.withProfiler(Stack);
