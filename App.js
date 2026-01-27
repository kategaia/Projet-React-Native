import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, Image, Button, Pressable, FlatList, ScrollView } from 'react-native';
import { Vibration } from 'react-native';

const DATA = [
  {
    id: '1',
    title: 'Red Wine',
  },
  {
    id: '2',
    title: 'White Wine',
  },
  {
    id: '3',
    title: 'Rosé Wine',
  },
];

const Item = ({ title }) => (
  <View style={styles.item}>
    <Text style={styles.itemTitle}>{title}</Text>
  </View>
);


export default function App() {
  return (
    
    <View style={styles.container}>
      <View style={styles.header}> 
        <Text style={styles.title}> WINE CELLULAR </Text>
      </View>
      <View style={styles.body}> 
        <Text>Welcome to Wine Cellular !</Text>
        <StatusBar style="auto" />
        <Image source={require('./assets/bouteille.png')} style={styles.img} />
        <Pressable style={styles.button} onPress={() => { Vibration.vibrate(100); }}>
          <Text style={styles.buttonText}>Press Me</Text>
        </Pressable>
        <FlatList
          data={DATA}
          renderItem={({ item }) => <Item title={item.title} />}
          keyExtractor={item => item.id}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  body : {
    flex: 1,
    alignItems: 'center',
  },
  header : {
    marginTop: 40,
    height: 60,
    backgroundColor: '#f8f8f8',
    alignItems: 'center',
    justifyContent: 'center',
  },
  img: {
    width: 200,
    height: 350,
  },
  item: {
    backgroundColor: '#0d9790',
    padding: 10,
    marginVertical: 8,
    marginHorizontal: 16,
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontSize: 32,
  },
  itemTitle: {
    fontSize: 16,
    color: '#fff',
  },
  button: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 12,
    paddingHorizontal: 32,
    borderRadius: 4,
    elevation: 3,
    backgroundColor: '#0d9790',
    marginTop: 20,
    marginBottom: 20,
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
  },
});
