import { View, Text, ScrollView } from "react-native";
import React, { useEffect } from "react";
import { fetchItems } from "../services/api";

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
    {
      key: "Nom",
      value: title,
    },
    {
      key: "Pays",
      value: country,
    },
    {
      key: "Région",
      value: region,
    },
  ];

  return (
    <ScrollView style={styles.container}>
      {labels.map(({ key, value }) => {
        if (value) {
          return (
            <Text style={styles.text}>
              {key} : {value}
            </Text>
          );
        }
      })}

      <Text style={styles.text}> Variété : {grape}</Text>
      <Text style={styles.text}> Seconde variété (si présente) : {grape2}</Text>
      <Text style={styles.text}> Caractéristiques : {characteristics}</Text>
      <Text style={styles.text}> Prix : {price} €</Text>
      <Text style={styles.text}> Millésime : {vintage}</Text>
      <Text style={styles.text}> Appellation : {appellation}</Text>
      <Text style={styles.text}> Type : {type}</Text>
      <Text style={styles.text}> Style : {style}</Text>
      <Text style={styles.text}> Contenance : {capacity} cl</Text>
      <Text style={styles.text}> Fermeture : {closure}</Text>
      <Text style={styles.description}>
        {" "}
        Description : {"\n"} {description}
      </Text>
    </ScrollView>
  );
}
export default DetailsScreen;

const styles = {
  text: {
    fontSize: 18,
    margin: 5,
    padding: 5,
  },
  container: {
    flex: 1,
    padding: 60,
  },
  description: {
    marginTop: 20,
    fontSize: 16,
    textAlign: "center",
    marginBottom: 120,
  },
};
