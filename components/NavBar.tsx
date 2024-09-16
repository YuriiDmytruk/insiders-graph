import React from 'react';
import {View, StyleSheet, TouchableOpacity, Text} from 'react-native';
import {RootStackParamList} from '../types/navigation-types'; // Adjust the path as needed
import {StackHeaderProps} from '@react-navigation/stack';
import {SafeAreaView} from 'react-native-safe-area-context';
import CountryPick from './CountryPick';

const NavBar: React.FC<StackHeaderProps> = ({navigation}) => {
  const handleNavigate = (screen: keyof RootStackParamList) => {
    navigation.navigate(screen);
  };

  return (
    <SafeAreaView>
      <View style={styles.container}>
        <CountryPick />
        <View style={styles.button_container}>
          <TouchableOpacity
            style={styles.button}
            onPress={() => handleNavigate('LineChart')}>
            <Text style={styles.button_text}>LineChart</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.button}
            onPress={() => handleNavigate('PieChart')}>
            <Text style={styles.button_text}>PieChart</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.button}
            onPress={() => handleNavigate('BarChart')}>
            <Text style={styles.button_text}>BarChart</Text>
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
  button_text: {
    fontSize: 20,
    color: '#2525f5',
  },
});

export default NavBar;
