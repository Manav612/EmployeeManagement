import React from 'react'
import { NavigationContainer } from '@react-navigation/native';
import { NavigationHandler } from './src/navigation/NavigationHandler';



const App = () => {
  return (
    <NavigationContainer>
      <NavigationHandler/>
    </NavigationContainer>
  )
}

export default App