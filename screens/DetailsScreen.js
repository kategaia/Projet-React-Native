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
    { key:"Variété", 
      value: grape
    },
    { key:"Seconde variété",
      value: grape2
    },
    {
      key: "Caractéristiques",
      value: characteristics,
    }, 
    { key: "Prix",
      value: price + " €"
    },
    {
      key: "Millésime",
      value: vintage,
    },
    {
      key: "Appellation",
      value: appellation,
    },
    {
      key:"Type",
      value: type,
    },
    { key: "Style",
      value: style,
    },
    { key: "Contenance",
      value: capacity 
    },
    { key: "Fermeture",
      value: closure,
    }
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
