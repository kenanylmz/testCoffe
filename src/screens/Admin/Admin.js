import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image, BackHandler } from 'react-native';
import { useFocusEffect } from '@react-navigation/native';
import auth from '@react-native-firebase/auth';

const Admin = () => {
  // Geri tuşunu engelle
  useFocusEffect(
    React.useCallback(() => {
      const onBackPress = () => {
        return true; // true döndürerek geri tuşunu engelliyoruz
      };

      BackHandler.addEventListener('hardwareBackPress', onBackPress);

      return () =>
        BackHandler.removeEventListener('hardwareBackPress', onBackPress);
    }, [])
  );

  const handleLogout = async () => {
    try {
      await auth().signOut();
      // Çıkış işlemi Firebase tarafından handle edilecek
    } catch (error) {
      console.error('Çıkış yapılırken hata:', error);
      Alert.alert(
        'Hata',
        'Çıkış yapılırken bir hata oluştu. Lütfen tekrar deneyin.'
      );
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Admin Panel</Text>
        <TouchableOpacity 
          onPress={handleLogout}
          style={styles.logoutButton}
        >
          <Image
            source={require('../../styles/cıkıs_icon.png')}
            style={styles.logoutIcon}
          />
        </TouchableOpacity>
      </View>
      <View style={styles.content}>
        <Text style={styles.text}>Admin Paneli</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: '#FFF',
    height: 60,
    paddingHorizontal: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#F0F0F0',
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#4A3428',
  },
  logoutButton: {
    padding: 5,
  },
  logoutIcon: {
    width: 24,
    height: 24,
    tintColor: '#4A3428',
  },
  content: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    fontSize: 24,
    fontWeight: 'bold',
  },
});

export default Admin;
