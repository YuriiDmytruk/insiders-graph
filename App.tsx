import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { Provider } from 'react-redux';
import { store } from './redux/store';

import NavBar from './components/NavBar';
import LineChartComponent from './charts/LineChartComponent';
import PieChartComponent from './charts/PieChartComponent';
import { RootStackParamList } from './types/navigation-types';

const Stack = createStackNavigator<RootStackParamList>();

function App(): React.JSX.Element {
  return (
    <Provider store={store}>
      <NavigationContainer>
        <Stack.Navigator

          screenOptions={{
            header: (props) => <NavBar {...props} />,
          }}
        >
          <Stack.Screen name="LineChart" component={LineChartComponent}/>
          <Stack.Screen name="PieChart" component={PieChartComponent} />
        </Stack.Navigator>
      </NavigationContainer>
    </Provider>
  );
}

export default App;
