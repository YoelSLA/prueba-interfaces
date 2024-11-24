import React, { useState, useContext } from 'react';
import { View, Text, StyleSheet, Modal } from 'react-native';
import { colors } from '../../../constants/Colors';
import { useRouter } from 'expo-router';
import { login } from '../../../services/users';
import {
  validationLoginRules,
  loginBody,
  validateForm,
} from '../../../utils/validationRules';
import FormInput from '../../../components/FormInput';
import BlueButton from '../../../components/BlueButton';
import TextButton from '../../../components/TextButton';
import { UserContext } from '../../../hooks/UserContext'

const Login = () => {
  const [formErrors, setFormErrors] = useState({});
  const [formData, setFormData] = useState(loginBody);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [errorMessages, setErrorMessages] = useState([]);
  const { setLoggedUser } = useContext(UserContext);
  const router = useRouter();

  const handleOnChange = (name, value) => {
    setFormData({ ...formData, [name]: value });
    setFormErrors({ ...formErrors, [name]: '' });
  };

  const registerRedirect = () => {
    router.replace('user/register');
  };

  const registerHome = () => {
    router.replace('/(tabs)');
  };

  const handleSubmit = async () => {
    const validationErrors = validateForm(formData, validationLoginRules);

    if (Object.keys(validationErrors).length > 0) {
      setFormErrors(validationErrors);
      setErrorMessages(Object.values(validationErrors));
      setIsModalVisible(true);
    } else {
      try {
        const user = await login(formData);
        setLoggedUser(user);
        registerHome()
      } catch (e) {
        console.log("ERROR", e)
        setIsModalVisible(true);
      }
    }
  };

  return (
    <View style={styles.pageContainer}>
      <View style={styles.loginContainer}>
        <View style={styles.contentContainer}>
          <Text style={styles.title}>Login</Text>
          <View style={styles.inputForms}>
            <FormInput
              label={'Email'}
              type={'email-address'}
              onChange={value => handleOnChange('email', value)}
              value={formData.email}
            />
            <FormInput
              label={'Password'}
              isSecure
              onChange={value => handleOnChange('password', value)}
              value={formData.password}
            />
          </View>
          <BlueButton
            children="Login"
            onPress={handleSubmit}
          />
          <TextButton
            children="Register"
            onPress={registerRedirect}
          />
        </View>
      </View>
      <Modal
        animationType="slide"
        transparent={true}
        visible={isModalVisible}
        onRequestClose={() => setIsModalVisible(false)}>
        <View style={styles.modalBackground}>
          <View style={styles.modalContainer}>
            {errorMessages.map((error, index) => (
              <Text
                key={index}
                style={styles.modalText}>
                {error}
              </Text>
            ))}
            <BlueButton
              children={'Close'}
              onPress={() => setIsModalVisible(false)}
              style={styles.buttonClose}
            />
          </View>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  pageContainer: {
    flex: 1,
    justifyContent: 'center',
    paddingLeft: 8,
    paddingRight: 8,
  },
  loginContainer: {
    backgroundColor: colors.surfaceContainer,
    height: 316,
  },
  contentContainer: {
    paddingLeft: 16,
    paddingRight: 16,
    gap: 16,
  },
  title: {
    fontWeight: '400',
    fontSize: 24,
    textAlign: 'center',
    fontFamily: 'Inter',
    paddingTop: 24,
  },
  inputForms: {
    alignItems: 'center',
    gap: 16,
  },
  modalBackground: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#00000070',
  },
  modalContainer: {
    padding: 20,
    backgroundColor: colors.surfaceContainer,
    borderRadius: 20,
    width: '90%',
  },
  modalText: {
    fontSize: 16,
    marginBottom: 20,
  },
});

export default Login;