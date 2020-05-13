import React from 'react';
import { StyleSheet, Text, View} from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';

export default function Header({ title, navigation }) {

  const openMenu = () => {
    navigation.openDrawer();
  }

  return (
    <View style={styles.header}>
      <MaterialIcons name='menu' size={28} onPress={openMenu} style={styles.drawer} />
      <View>
        <Text style={styles.headerText}>{title}</Text>
      </View>
      <MaterialIcons name='person' size={28} onPress={()=>navigation.navigate('Account')} style={styles.person} />
    </View>
  );
}

const styles = StyleSheet.create({
  header: {
    width: '100%',
    height:'100%',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  headerText: {
    fontWeight: 'bold',
    fontSize: 20,
    color: '#333',
    letterSpacing: 1,
  },
  drawer: {
    position: 'absolute',
    left: 16,
  },
  person:{
    position: 'absolute',
    right: 16,
  }

});