import React from 'react';
import {AuthProvider} from './AuthProvider';
import Stack from './Stack';

const Providers = () => {
  return (
    <AuthProvider>
      <Stack />
    </AuthProvider>
  );
};

export default Providers;
