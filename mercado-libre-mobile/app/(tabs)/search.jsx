import React, {useContext} from 'react';
import { View, Text, StyleSheet } from 'react-native'
import { UserContext } from '../../hooks/UserContext'

const Search = () => {
  const { loggedUser } = useContext(UserContext);

  return (
    <View style={styles.titleContainer}><Text>{loggedUser ? "ESTOY LOGEADO" : "NO ESTOY LOGEADO"}</Text></View>
  )
}

export default Search

const styles = StyleSheet.create({
  titleContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
    backgroundColor: 'cyan',
    height: 500
  },
});
