import React from 'react';
import { View, Text, TextInput, StyleSheet } from 'react-native';
import { colors } from '../constants/Colors';

const FormInput = ({
  label,
  value,
  onChange,
  type,
  placeholder = 'Placeholder...',
  isSecure = false,
  lenght = 255,
}) => {
  return (
    <View style={styles.inputContainer}>
      <Text style={styles.label}>{label}</Text>
      <TextInput
        style={styles.inputBox}
        placeholder={placeholder}
        value={value}
        onChangeText={text => onChange(text)}
        keyboardType={type}
        secureTextEntry={isSecure}
        maxLength={lenght}
        autoCapitalize="none"
      />
    </View>
  );
};

export default FormInput;

const styles = StyleSheet.create({
  inputContainer: {
    width: '100%',
    height: 59,
  },
  label: {
    fontSize: 16,
    fontWeight: '300',
    color: colors.onSurfaceContainer,
    lineHeight: 19.36,
    fontFamily: 'Inter',
    marginBottom: 8,
  },
  inputBox: {
    backgroundColor: colors.surfaceContainer,
    height: 32,
    shadowColor: colors.onSurfaceContainer,
    shadowOpacity: 0.15,
    shadowRadius: 4,
    shadowOffset: { width: 0, height: 2 },
    elevation: 5,
    borderRadius: 10,
    width: '100%',
    padding: 5,
    borderWidth: 0.3,
  },
});