import React from 'react';
import { TouchableOpacity, Text, StyleSheet } from 'react-native';
import { colors } from '../constants/Colors';

const Component = ({ onPress, children }) => {
  return (
    <TouchableOpacity
      onPress={onPress ? () => onPress() : null}
      style={styles.button}>
      <Text style={styles.buttonText}>{children}</Text>
    </TouchableOpacity>
  );
};

export default Component;

const styles = StyleSheet.create({
  button: {
    backgroundColor: colors.surfaceContainer,
    width: '100%',
    height: 66,
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonText: {
    color: colors.onSurface,
    fontSize: 24,
  },
});