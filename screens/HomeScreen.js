import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, Image, Pressable, FlatList, } from 'react-native';

export default function HomeScreen({ navigation }) {
  return (
    <View style={styles.container}>
        <Text style={styles.title}>Welcome to WineCellular !</Text>
        <StatusBar style="auto" />
        <Image source={require('../assets/2728103.png')} style={styles.img} />
        <Text style={styles.text}>Votre application de gestion de cave à vin.
                Avec une partie cherche des vins présents dans le monde entier,
                une partie liste de vos vins et une partie détails pour chaque vin.</Text>
        <Text>Bonne dégustation !
        </Text>
        <Pressable style={styles.button} onPress={() => navigation.navigate('Vin')}>
            <Text style={styles.buttonText}>Liste des Vins</Text>
        </Pressable>
        <Pressable style={styles.button} onPress={() => navigation.navigate('Cave')}>
            <Text style={styles.buttonText}>Vos caves à vins</Text>
        </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ffffff',
    alignItems: 'center',
  },
  img: {
    width: 350,
    height: 400,
    margin: 20,
  },
    button: {
    backgroundColor: '#8B0000',
    padding: 10,
    borderRadius: 5,
    marginTop: 15,
    width: '80%',
    alignItems: 'center'
    },
    buttonText: {
    color: '#fff',
    fontWeight: 'bold',
    },
    item: {
    padding: 10,
    fontSize: 18,
    height: 44,
    },
    title: {
    marginTop: 20,
    fontSize: 24,
    fontWeight: 'bold',
    },
    text: {
    margin: 20,
    fontSize: 16,
    textAlign: 'center',
    },
});