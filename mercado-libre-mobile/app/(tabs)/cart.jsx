import React, {useContext} from 'react';
import { View, Text, StyleSheet } from 'react-native'
import { UserContext } from '../../hooks/UserContext'
import ProtectedRoute from '../../components/ProtectedRoute';

const Cart = () => {
  const { loggedUser } = useContext(UserContext);

  return (
    <ProtectedRoute>
      <View style={styles.titleContainer}><Text>{loggedUser ? "ESTOY LOGEADO" : "NO ESTOY LOGEADO"}</Text></View>
    </ProtectedRoute>

  )
}

export default Cart

const styles = StyleSheet.create({
  titleContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
    backgroundColor: 'orange',
    height: 500
  },
});
