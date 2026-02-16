import {
  View,
  Text,
  ActivityIndicator,
  FlatList,
  TouchableOpacity,
  StyleSheet,
} from "react-native";
import { useState, useEffect } from "react";
import { fetchItems } from "../services/api";

export default function ListScreen({ navigation }) {
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchItems()
      .then((responseData) => {
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
      {loading && <ActivityIndicator size="large" color="#8B0000" />}
      {error && <Text style={styles.error}>Error: {error.message}</Text>}

      <FlatList
        data={data}
        keyExtractor={(item, index) =>
          item?.id ? item.id.toString() : index.toString()
        }
        contentContainerStyle={styles.listContent}
        renderItem={({ item, index }) => (
          <TouchableOpacity
            style={styles.card}
            activeOpacity={0.7}
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
            <Text style={styles.cardIndex}>{index + 1}</Text>
            <Text style={styles.cardTitle}>{item.title}</Text>
            <Text style={styles.cardSubtitle}>
              {item.country ?? "-"} • {item.vintage ?? "-"}
            </Text>
          </TouchableOpacity>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f2f2f2",
    paddingHorizontal: 16,
    paddingTop: 20,
  },

  listContent: {
    paddingBottom: 20,
  },

  card: {
    backgroundColor: "#ffffff",
    padding: 16,
    borderRadius: 14,
    marginBottom: 14,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.15,
    shadowRadius: 6,
    elevation: 5,
  },

  cardIndex: {
    fontSize: 12,
    color: "#8B0000",
    fontWeight: "600",
    marginBottom: 4,
  },

  cardTitle: {
    fontSize: 18,
    fontWeight: "600",
  },

  cardSubtitle: {
    marginTop: 4,
    fontSize: 14,
    color: "#666",
  },

  error: {
    color: "red",
    marginBottom: 10,
  },
});
