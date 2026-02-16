import { View, Text, ScrollView, StyleSheet } from "react-native";
import React from "react";

function DetailsScreen({ route }) {
  const {
    title,
    description,
    price,
    capacity,
    grape,
    grape2,
    closure,
    country,
    region,
    style,
    type,
    characteristics,
    vintage,
    appellation,
  } = route.params;

  const labels = [
    { key: "Pays", value: country },
    { key: "Région", value: region },
    { key: "Variété", value: grape },
    { key: "Seconde variété", value: grape2 },
    { key: "Caractéristiques", value: characteristics },
    { key: "Prix", value: price ? price + " €" : null },
    { key: "Millésime", value: vintage },
    { key: "Appellation", value: appellation },
    { key: "Type", value: type },
    { key: "Style", value: style },
    { key: "Contenance", value: capacity },
    { key: "Fermeture", value: closure },
  ];

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>
      <View style={styles.card}>
        <Text style={styles.title}>{title}</Text>

        {labels.map(({ key, value }) => {
          if (!value) return null;

          return (
            <View key={key} style={styles.row}>
              <Text style={styles.label}>{key}</Text>
              <Text style={styles.value}>{value}</Text>
            </View>
          );
        })}

        {description && (
          <View style={styles.descriptionContainer}>
            <Text style={styles.descriptionTitle}>Description</Text>
            <Text style={styles.description}>{description}</Text>
          </View>
        )}
      </View>
    </ScrollView>
  );
}

export default DetailsScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f2f2f2",
  },

  content: {
    padding: 20,
  },

  card: {
    backgroundColor: "#ffffff",
    borderRadius: 16,
    padding: 20,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 5 },
    shadowOpacity: 0.15,
    shadowRadius: 10,
    elevation: 6,
  },

  title: {
    fontSize: 22,
    fontWeight: "bold",
    marginBottom: 20,
    color: "#8B0000",
  },

  row: {
    marginBottom: 10,
  },

  label: {
    fontSize: 13,
    color: "#888",
    marginBottom: 2,
  },

  value: {
    fontSize: 16,
    fontWeight: "500",
  },

  descriptionContainer: {
    marginTop: 20,
    paddingTop: 15,
    borderTopWidth: 1,
    borderColor: "#eee",
  },

  descriptionTitle: {
    fontSize: 16,
    fontWeight: "600",
    marginBottom: 6,
  },

  description: {
    fontSize: 15,
    lineHeight: 22,
    color: "#444",
  },
});
