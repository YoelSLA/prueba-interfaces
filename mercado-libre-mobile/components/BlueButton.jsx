import React from 'react';
import { TouchableOpacity, Text, StyleSheet } from 'react-native';
import { colors } from '../constants/Colors';

const BlueButton = ({ onPress, children, width = '100%', height = '34' }) => {
  return (
    <TouchableOpacity
      onPress={onPress ? () => onPress() : null}
      style={[styles.button, { width }, { height }]}>
      <Text style={styles.buttonText}>{children}</Text>
    </TouchableOpacity>
  );
};

export default BlueButton;

const styles = StyleSheet.create({
  button: {
    backgroundColor: colors.info,
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonText: {
    color: colors.surfaceContainer,
    fontSize: 14,
    lineHeight: 18,
    fontFamily: 'Inter',
  },
});