import React, {useEffect, useState} from 'react';
import {View, StyleSheet, TouchableOpacity, Text} from 'react-native';
import {RootStackParamList} from '../types/navigation-types'; // Adjust the path as needed
import {StackHeaderProps} from '@react-navigation/stack';
import {SafeAreaView} from 'react-native-safe-area-context';
import CountryPick from './CountryPick';

const NavBar: React.FC<StackHeaderProps> = ({navigation}) => {

  const [activeScreen, setActiveScreen] = useState<string>('');

  useEffect(() => {
    const getCurrentScreen = () => {
      const state = navigation.getState();
      const activeRoute = state.routes[state.index];
      setActiveScreen(activeRoute.name);
    };
    getCurrentScreen();
    const unsubscribe = navigation.addListener('state', getCurrentScreen);
    return () => {
      unsubscribe();
    };
  }, [navigation]);

  const handleNavigate = (screen: keyof RootStackParamList) => {
    navigation.navigate(screen);
    setActiveScreen(screen);
  };

  return (
    <SafeAreaView>
      <View style={styles.container}>
        <CountryPick />
        <View style={styles.button_container}>
          <TouchableOpacity
            style={
              activeScreen === 'LineChart'
                ? [styles.button, styles.active_button]
                : styles.button
            }
            onPress={() => handleNavigate('LineChart')}>
            <Text
              style={
                activeScreen === 'LineChart'
                  ? [styles.button_text, styles.active_button_text]
                  : styles.button_text
              }>
              LineChart
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={
              activeScreen === 'PieChart'
                ? [styles.button, styles.active_button]
                : styles.button
            }
            onPress={() => handleNavigate('PieChart')}>
            <Text
              style={
                activeScreen === 'PieChart'
                  ? [styles.button_text, styles.active_button_text]
                  : styles.button_text
              }>
              PieChart
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={
              activeScreen === 'BarChart'
                ? [styles.button, styles.active_button]
                : styles.button
            }
            onPress={() => handleNavigate('BarChart')}>
            <Text
              style={
                activeScreen === 'BarChart'
                  ? [styles.button_text, styles.active_button_text]
                  : styles.button_text
              }>
              BarChart
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 10,
    backgroundColor: '#f7f7f7',
    gap: 10,
  },
  button_container: {
    flexDirection: 'row',
    justifyContent: 'center',
    gap: 20,
    flexWrap: 'wrap',
  },
  button: {
    paddingHorizontal: 20,
    paddingVertical: 5,
    borderColor: '#2525f5',
    borderRadius: 10,
    borderWidth: 1,
  },
  active_button: {
    backgroundColor: '#2525f5',
  },
  button_text: {
    fontSize: 20,
    color: '#2525f5',
  },
  active_button_text: {
    color: '#FFF',
  },
});

export default NavBar;
