import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
} from "react-native";
import { useState } from "react";

export default function BottleForm({ onSubmit, onClose }) {
  const [name, setName] = useState("");
  const [type, setType] = useState("");
  const [vintage, setVintage] = useState("");
  const [price, setPrice] = useState("");
  const [country, setCountry] = useState("");
  const [domain, setDomain] = useState("");
  const [grapeVariety, setGrapeVariety] = useState("");
  const [appelation, setAppelation] = useState("");
  const [bottleCapacity, setBottleCapacity] = useState("");
  const [compatibleFood, setCompatibleFood] = useState("");
  const [position, setPosition] = useState("");

  return (
    <View style={styles.container}>
      <Text style={styles.label}>Nom</Text>
      <TextInput value={name} onChangeText={setName} style={styles.input} />

      <Text style={styles.label}>Type</Text>
      <TextInput value={type} onChangeText={setType} style={styles.input} />

      <Text style={styles.label}>Millésime</Text>
      <TextInput
        value={vintage}
        onChangeText={setVintage}
        keyboardType="numeric"
        style={styles.input}
      />

      <Text style={styles.label}>Prix</Text>
      <TextInput
        value={price}
        onChangeText={setPrice}
        keyboardType="numeric"
        style={styles.input}
      />

      <Text style={styles.label}>Domaine</Text>
      <TextInput value={domain} onChangeText={setDomain} style={styles.input} />

      <Text style={styles.label}>Pays</Text>
      <TextInput
        value={country}
        onChangeText={setCountry}
        style={styles.input}
      />

      <Text style={styles.label}>Cépage</Text>
      <TextInput
        value={grapeVariety}
        onChangeText={setGrapeVariety}
        style={styles.input}
      />

      <Text style={styles.label}>Appellation</Text>
      <TextInput
        value={appelation}
        onChangeText={setAppelation}
        style={styles.input}
      />

      <Text style={styles.label}>Capacité</Text>
      <TextInput
        value={bottleCapacity}
        onChangeText={setBottleCapacity}
        style={styles.input}
      />

      <Text style={styles.label}>Accord mets/vins</Text>
      <TextInput
        value={compatibleFood}
        onChangeText={setCompatibleFood}
        style={styles.input}
      />

      <Text style={styles.label}>Position dans la cave</Text>
      <TextInput
        value={position}
        onChangeText={setPosition}
        style={styles.input}
      />

      <View style={styles.buttonRow}>
        <TouchableOpacity
          style={styles.primaryButton}
          onPress={() =>
            onSubmit({
              name,
              type,
              vintage: Number(vintage) || 0,
              price: Number(price) || 0,
              domain,
              country,
              grapeVariety,
              appelation,
              bottleCapacity,
              compatibleFood,
              position,
            })
          }
        >
          <Text style={styles.primaryButtonText}>Ajouter</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.secondaryButton} onPress={onClose}>
          <Text style={styles.secondaryButtonText}>Annuler</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingVertical: 10,
  },

  label: {
    fontSize: 14,
    fontWeight: "500",
    marginBottom: 4,
  },

  input: {
    borderWidth: 1,
    borderColor: "#ddd",
    padding: 10,
    marginBottom: 12,
    borderRadius: 8,
  },

  buttonRow: {
    marginTop: 10,
  },

  primaryButton: {
    backgroundColor: "#8B0000",
    padding: 12,
    borderRadius: 10,
    alignItems: "center",
    marginBottom: 10,
  },

  primaryButtonText: {
    color: "#fff",
    fontWeight: "600",
  },

  secondaryButton: {
    padding: 12,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: "#8B0000",
    alignItems: "center",
  },

  secondaryButtonText: {
    color: "#8B0000",
    fontWeight: "600",
  },
});
