import React from 'react';
import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';

type Props = {
  label: string;
  value: number;
  close: (value: boolean) => void;
};

const Info: React.FC<Props> = ({label, value, close}) => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>{label}</Text>
      <Text style={styles.text}>Value: {value}</Text>
      <View style={styles.button_container}>
        <TouchableOpacity onPress={() => close(true)} style={styles.button}>
          <Text style={styles.button_text}>Close</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    top: 'auto',
    left: 'auto',
    right: 'auto',
    bottom: 'auto',
    width: '100%',
    borderRadius: 20,
    zIndex: 100,
    backgroundColor: '#FFF',
    paddingHorizontal: 'auto',
    paddingVertical: 20,
  },
  button: {
    paddingHorizontal: 20,
    paddingVertical: 5,
    borderColor: '#2525f5',
    borderRadius: 10,
    borderWidth: 1,
  },
  button_text: {
    fontSize: 15,
    color: '#2525f5',
  },
  text: {
    textAlign: 'center',
    fontSize: 20,
  },
  title: {
    fontSize: 30,
    textAlign: 'center',
  },
  button_container: {
    paddingTop: 20,
    flexDirection: 'row',
    justifyContent: 'center',
    flexWrap: 'wrap',
    gap: 20,
  },
});

export default Info;
