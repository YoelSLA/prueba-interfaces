import React, { useContext, useState, useCallback } from 'react';
import { View, ActivityIndicator } from 'react-native';
import { UserContext } from '../hooks/UserContext';
import { useRouter } from 'expo-router';
import { useFocusEffect } from '@react-navigation/native';

const ProtectedRoute = ({ children }) => {
  const { loggedUser } = useContext(UserContext);
  const router = useRouter();
  const [isRedirecting, setIsRedirecting] = useState(false);

  console.log("LOGGED USER EN PROTECTED ROUTE", loggedUser)

  useFocusEffect(
    useCallback(() => {
      if (!loggedUser) {
        setIsRedirecting(true);
        const timer = setTimeout(() => {
          router.push('/user/login'); 
        }, 0);

        return () => clearTimeout(timer); 
      }
    }, [loggedUser, router])
  );

  if (!isRedirecting) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <ActivityIndicator size="large" color="#0000ff" />
      </View>
    );
  }

  return loggedUser ? children : null;
};

export default ProtectedRoute;
