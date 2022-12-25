import React, { useState, useEffect } from 'react'
import { StyleSheet } from 'react-native'
import { Provider } from 'react-redux'
import { store } from './store'
import RootNavigation from './src/navigation/RootNavigation'
import { SafeAreaProvider } from 'react-native-safe-area-context'
import { GestureHandlerRootView } from 'react-native-gesture-handler'


const App = () => {
  return (
    <Provider store={store}>
      <GestureHandlerRootView style={{ flex: 1 }}>
        <SafeAreaProvider >
          <RootNavigation />
        </SafeAreaProvider>
      </GestureHandlerRootView>
    </Provider>
  )
}

export default App

const styles = StyleSheet.create({})