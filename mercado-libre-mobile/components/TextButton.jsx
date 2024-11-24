import React from 'react';
import { Pressable, Text, StyleSheet } from 'react-native';
import { colors } from '../constants/Colors';

const TextButtton = ({ onPress, children }) => {
  return (
    <Pressable
      onPress={onPress}
      style={styles.buttonEmpty}>
      <Text style={styles.buttonEmptyText}>{children}</Text>
    </Pressable>
  );
};

export default TextButtton;

const styles = StyleSheet.create({
  buttonEmpty: {
    widht: '100%',
    height: 18,
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonEmptyText: {
    // fontFamily: 'Inter',
    color: colors.info,
    fontSize: 16,
    fontWeight: '300',
    lineHeight: 18,
    textAlign: 'center',
    textDecorationLine: 'underline',
  },
});