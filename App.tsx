import React from 'react';
import {SafeAreaView, StyleSheet, Text, View} from 'react-native';
import {Provider} from 'react-redux';
import {store} from './redux/store';
import CountryPick from './components/CountryPick';

function App(): React.JSX.Element {
  return (
    <Provider store={store}>
      <SafeAreaView style={styles.container}>
        <View>
        <CountryPick />
        </View>
        <View>
          <Text>App</Text>
        </View>
      </SafeAreaView>
    </Provider>
  );
}

const styles = StyleSheet.create({
  container: {
  },
});

export default App;
