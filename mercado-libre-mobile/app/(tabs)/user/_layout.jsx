import React, {useContext, useCallback, useState, useEffect} from 'react';
import { Stack, useRouter } from 'expo-router';
import { colors } from '../../../constants/Colors';
import { UserContext } from '../../../hooks/UserContext'
import { useFocusEffect } from '@react-navigation/native';

export default function UserLayout() {

  const { loggedUser } = useContext(UserContext);
  const router = useRouter();
  const [hasRedirected, setHasRedirected] = useState(false);

  const capitalize = (str) => str.charAt(0).toUpperCase() + str.slice(1);
  const title = loggedUser ? capitalize(loggedUser.name) : '';

  useFocusEffect(
    useCallback(() => {
      if (!hasRedirected) {
        if (loggedUser) {
          router.replace('/user');
        } else {
          router.replace('/user/login');
        }
        setHasRedirected(true);
      }
    }, [loggedUser, hasRedirected, router])
  );

  useEffect(() => {
    setHasRedirected(false);
  }, [loggedUser]);

  return (
    <Stack
      initialRouteName="index"
      screenOptions={{
        tabBarActiveTintColor: colors.onSurfaceContainer,
        headerShadowVisible: false,
        headerTintColor: colors.onSurfaceContainer,
        headerStyle: {
          backgroundColor: colors.primary,
        },
        headerTitleAlign: 'right',
        headerTitleStyle: {
          fontSize: 24,
          fontWeight: '500 ',
        },
        tabBarStyle: {
          backgroundColor: colors.surfaceContainer,
        },
      }}>
      <Stack.Screen
        name="index"
        options={{
          title: title,
          headerShown: true,
        }}
      />
      <Stack.Screen
        name="register"
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="login"
        options={{
          headerShown: false,
        }}
      />
    </Stack>
  );
}