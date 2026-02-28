import { Ionicons } from '@expo/vector-icons';
import { DrawerActions } from '@react-navigation/native';
import { useNavigation } from 'expo-router';
import React from 'react';
import { Image, Text, TouchableOpacity, View } from 'react-native';
import styles from '../constants/stylehome';

const Header = () => {
  const navigation = useNavigation();

  const toggleMenu = () => {
    navigation.dispatch(DrawerActions.toggleDrawer());
  };

  return (
    <View style={styles.navBar}>
      <TouchableOpacity onPress={toggleMenu}>
        <Ionicons name="menu" size={28} color="black" />
      </TouchableOpacity>
      <View style={styles.containerLogo}>
        <Image source={require('../assets/images/favicon.png')} style={styles.imgLogo} />
        <Text style={styles.txtLogo}>FindBook</Text>
      </View>
    </View>
  );
};

export default Header;