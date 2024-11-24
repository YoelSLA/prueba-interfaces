import React, { useState, useEffect, createContext } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { getUser } from '../services/users';

export const UserContext = createContext(null);

export const UserProvider = ({ children }) => {
  const [loggedUser, setLoggedUser] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    AsyncStorage.getItem('token')
      .then(tokenUser => {
        console.log(tokenUser)
        if (tokenUser) {
          getUser()
            .then(userData => {
              setLoggedUser(userData);
            })
            .catch(e => {

              setError(e);
            });
        }
      })
      .catch(e => {

        setError(e);
      });
  }, []); 

  return (
    <UserContext.Provider value={{ loggedUser, setLoggedUser }}>
      {children}
    </UserContext.Provider>
  );
};