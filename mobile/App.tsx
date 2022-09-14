/* eslint-disable @typescript-eslint/no-unused-vars */
/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * Generated with the TypeScript template
 * https://github.com/react-native-community/react-native-template-typescript
 *
 * @format
 */

import React, {useState} from 'react';
import {StatusBar} from 'react-native';
import {Background} from './src/components/Background';
import {Loading} from './src/components/Loading';
import {Home} from './src/screens/Home';

export default function App() {
  const [isLoading, setIsLoading] = useState(false);

  return (
    <Background>
      <StatusBar
        barStyle="light-content"
        backgroundColor="transparent"
        translucent
      />
      {isLoading ? <Loading /> : <Home />}
    </Background>
  );
}
