import React, { useState } from 'react';
import { useRouter } from 'expo-router';
import { View, Text, Modal, StyleSheet } from 'react-native';
import { colors } from '../../../constants/Colors';
import {
  validateForm,
  validationRegisterRules,
  registerBody,
} from '../../../utils/validationRules';
import { register } from '../../../services/users';
import BlueButton from '../../../components/BlueButton';
import TextButton from '../../../components/TextButton';
import InputField from '../../../components/InputField';

const Register = () => {
  const [formData, setFormData] = useState(registerBody);
  const [formErrors, setFormErrors] = useState({});
  const [isPopupVisible, setIsPopupVisible] = useState(false);
  const router = useRouter();

  const handleInputChange = (field, value) => {
    setFormData({ ...formData, [field]: value });
    setFormErrors({ ...formErrors, [field]: '' });
  };

  const handleRegister = async () => {
    const errors = validateForm(formData, validationRegisterRules);

    if (Object.keys(errors).length > 0) {
      setFormErrors(errors);
      return;
    }

    try {
      await register(formData);
      setFormData(registerBody);
      setFormErrors({});
      router.replace('user/login');
    } catch (error) {
      setIsPopupVisible(true);
    }
  };

  const handleClosePopup = () => {
    setIsPopupVisible(false);
  };

  const handleLoginRedirect = () => {
    router.replace('user/login');
  };

  return (
    <View style={styles.pageContainer}>
      <View style={styles.container}>
        <Text style={styles.title}>Register</Text>
        <View style={styles.separator} />
        <View style={styles.form}>
          <InputField
            label="Name"
            placeholder="Name"
            value={formData.name}
            onChangeText={value => handleInputChange('name', value)}
            error={formErrors.name}
          />

          <InputField
            label="Email"
            placeholder="Email"
            value={formData.email}
            onChangeText={value => handleInputChange('email', value)}
            error={formErrors.email}
          />

          <InputField
            label="Imagen"
            placeholder="Image"
            value={formData.image}
            onChangeText={value => handleInputChange('image', value)}
            error={formErrors.image}
          />

          <InputField
            label="Contraseña"
            placeholder="Password"
            secureTextEntry
            value={formData.password}
            onChangeText={value => handleInputChange('password', value)}
            error={formErrors.password}
          />
          <View style={styles.buttonContainer}>
            <BlueButton
              children="Register"
              onPress={handleRegister}
            />
            <TextButton
              children="Login"
              onPress={handleLoginRedirect}
            />
          </View>
        </View>
      </View>

      <Modal
        visible={isPopupVisible}
        transparent
        animationType="slide"
        onRequestClose={handleClosePopup}>
        <View style={styles.popupContainer}>
          <View style={styles.popup}>
            <Text style={styles.popupText}>
              Este correo ya está registrado!
            </Text>
            <BlueButton
              children="Cerrar"
              onPress={handleClosePopup}
              width={'100'}
            />
          </View>
        </View>
      </Modal>
    </View>
  );
};

export default Register;

const styles = StyleSheet.create({
  pageContainer: {
    flex: 1,
    justifyContent: 'center',
    alignContent: 'center',
    paddingVertical: 24,
    paddingLeft: 8,
    paddingRight: 8,
  },
  container: {
    justifyContent: 'center',
    padding: 16,
    backgroundColor: colors.surfaceContainer,
  },
  title: {
    fontSize: 24,
    fontWeight: 400,
    textAlign: 'center',
    marginBottom: 16,
  },
  separator: {
    height: 0.5,
    backgroundColor: colors.onSurfaceContainer,
    width: '100%',
    alignSelf: 'center',
  },
  form: {
    marginTop: 16,
  },
  popupContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  popup: {
    width: '80%',
    backgroundColor: '#FFF',
    borderRadius: 8,
    padding: 16,
    alignItems: 'center',
  },
  popupText: {
    fontSize: 16,
    textAlign: 'center',
    marginBottom: 16,
  },

  buttonContainer: {
    gap: 16,
  },
});