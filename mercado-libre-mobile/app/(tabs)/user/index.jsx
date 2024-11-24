import React, { useContext, useEffect } from 'react';
import { View, StyleSheet } from 'react-native';
import { useRouter } from 'expo-router';
import UserOptionsButton from '../../../components/UserOptionsButton';
import BlueButton from '../../../components/BlueButton';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { UserContext } from '../../../hooks/UserContext'

const User = () => {
  const router = useRouter();
  const { loggedUser, setLoggedUser } = useContext(UserContext);

  const handleLogout = () => {
    setLoggedUser(null);
    AsyncStorage.clear();
    router.replace('user/login');
  };

  // const handleNavigateToProducts = (type, products) => {
  //   navigation.push(`[productType]`, {
  //     type,
  //     products: JSON.stringify(products),
  //   });
  // };

  const productMappings = {
    liked: loggedUser?.likedProducts || [],
    sales: loggedUser?.salesHistory?.map(sale => sale.product) || [],
    purchases:
      loggedUser?.purchaseHistory?.flatMap(purchase =>
        purchase.items.map(item => item.product),
      ) || [],
    'my-products': loggedUser?.products || [],
  };

  return (
    <View style={styles.container}>
      <View style={styles.userContainerButton}>
        {/* <UserOptionsButton
          children={'Liked'}
          onPress={() =>
            handleNavigateToProducts('Liked', productMappings.liked)
          }
        />
        <UserOptionsButton
          children={'Sales'}
          onPress={() =>
            handleNavigateToProducts('Sales', productMappings.sales)
          }
        />
        <UserOptionsButton
          children={'Purchases'}
          onPress={() =>
            handleNavigateToProducts('Purchases', productMappings.purchases)
          }
        />
        <UserOptionsButton
          children={'My products'}
          onPress={() =>
            handleNavigateToProducts(
              'My products',
              productMappings['my-products'],
            )
          }
        /> */}
      </View>
      <BlueButton
        onPress={handleLogout}
        children={'Logout'}
        height={'48'}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'space-between',
    paddingVertical: 16,
    paddingHorizontal: 8,
  },
  userContainerButton: {
    justifyContent: 'flex-start',
    alignItems: 'center',
    gap: 10,
  },
});

export default User;