import {
  View,
  Text,
  ActivityIndicator,
  FlatList,
  TouchableOpacity,
} from "react-native";
import { useState, useEffect } from "react";
import React from "react";
import { fetchItems } from "../services/api";

export default function ListScreen({ navigation }) {
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchItems()
      .then((responseData) => {
        console.log(responseData);
        setData(responseData.data);
        setLoading(false);
      })
      .catch((error) => {
        setError(error);
        setLoading(false);
      });
  }, []);

  return (
    <View style={styles.container}>
      {loading && <ActivityIndicator />}
      {error && <Text>Error: {error.message}</Text>}
      <FlatList
        data={data}
        renderItem={({ item, index }) => (
          <TouchableOpacity
            onPress={() =>
              navigation.navigate("Détails", {
                title: item.title,
                description: item.description,
                price: item.price,
                capacity: item.capacity,
                grape: item.grape,
                grape2: item.grape2,
                closure: item.closure,
                country: item.country,
                region: item.region,
                style: item.style,
                type: item.type,
                characteristics: item.characteristics,
                vintage: item.vintage,
                appellation: item.appellation,
              })
            }
          >
            <Text style={styles.text}>
              {index + 1}. {item.title}
            </Text>
          </TouchableOpacity>
        )}
        keyExtractor={(item) => item.id.toString()}
      />
    </View>
  );
}

const styles = {
  text: {
    fontSize: 18,
    margin: 10,
  },
  container: {
    flex: 1,
    padding: 40,
  },
};
