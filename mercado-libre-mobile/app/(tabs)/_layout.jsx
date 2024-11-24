import { Tabs } from 'expo-router';
import Ionicons from '@expo/vector-icons/Ionicons';
import { MaterialIcons } from '@expo/vector-icons';
import { colors } from '../../constants/Colors';
import { useContext } from 'react';
import { UserContext } from '../../hooks/UserContext';


const TabLayout = () => {
  const { loggedUser } = useContext(UserContext);

  return (
    <Tabs
      screenOptions={{
        headerShadowVisible: false,
        headerTintColor: colors.onSurfaceContainer,
        headerStyle: {
          backgroundColor: colors.primary,
        },
        headerTitleStyle: {
          fontSize: 24,
          fontWeight: '400',
        },
        tabBarStyle: {
          backgroundColor: colors.surfaceContainer,
        },
        tabBarShowLabel: false,
        tabBarActiveTintColor: colors.onSurfaceContainer,
      }}>
      <Tabs.Screen
        name="index"
        options={{
          title: 'Latest updated products',
          tabBarIcon: ({ color, focused }) => (
            <Ionicons
              name={focused ? 'home-sharp' : 'home-outline'}
              color={color}
              size={24}
            />
          ),
        }}
      />
      <Tabs.Screen
        name="categories"
        options={{
          title: 'Categories',
          tabBarIcon: ({ color, focused }) => (
            <MaterialIcons name="category" color={color} size={24} />
          ),
        }}
      />
      <Tabs.Screen
        name="search"
        options={{
          title: 'Search',
          tabBarIcon: ({ color, focused }) => (
            <Ionicons
              name={focused ? 'search' : 'search-outline'}
              size={24}
              color={color}
            />
          ),
        }}
      />
      <Tabs.Screen
        name="cart"
        options={{
          title: loggedUser ? 'Cart' : '',
          headerShown: loggedUser, // Solo muestra el header si el usuario está logueado
          tabBarIcon: ({ color, focused }) => (
            <Ionicons
              name={focused ? 'cart' : 'cart-outline'}
              color={color}
              size={24}
            />
          ),
        }}
      />
      <Tabs.Screen
        name="user"
        options={{
          title: 'User',
          headerShown: false,
          tabBarIcon: ({ color, focused }) => (
            <Ionicons
              name={focused ? 'person' : 'person-outline'}
              size={24}
              color={color}
            />
          ),
        }}
      />
    </Tabs>
  );
};

export default TabLayout;
