import { View, Text, StyleSheet, Button, TextInput } from "react-native";
import { useState } from "react";
import { addWineCellar, updateWineCellar } from "../services/fire";

export default function WineCellarForm({ setVisible, selectedWinecellar }) {
  const [name, setName] = useState(selectedWinecellar?.name || "");
  const [bottlesNumber, setBottlesNumber] = useState(
    selectedWinecellar?.bottlesNumber || "",
  );
  const [capacity, setCapacity] = useState(selectedWinecellar?.capacity || "");

  const handleSubmit = () => {
    let winecellar = {
      name,
      bottlesNumber,
      capacity,
      bottles: [],
    };

    if (selectedWinecellar) {
      winecellar.id = selectedWinecellar.id;
      winecellar.bottles = selectedWinecellar.bottles;
      updateWineCellar(winecellar);
    } else {
      addWineCellar(winecellar);
    }

    setVisible(false);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>
        {selectedWinecellar ? "Modifier la cave" : "Créer une nouvelle cave"}
      </Text>

      <Text style={styles.label}>Nom de la cave</Text>
      <TextInput style={styles.input} onChangeText={setName} value={name} />

      <Text style={styles.label}>Capacité max</Text>
      <TextInput
        style={styles.input}
        onChangeText={setCapacity}
        value={capacity}
        keyboardType="numeric"
      />

      <Text style={styles.label}>Nombre de bouteilles</Text>
      <TextInput
        style={styles.input}
        onChangeText={setBottlesNumber}
        value={bottlesNumber}
        keyboardType="numeric"
      />

      <View style={styles.buttonContainer}>
        <Button
          title={selectedWinecellar ? "Modifier" : "Créer"}
          onPress={handleSubmit}
          color="#8B0000"
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
    backgroundColor: "#fff",
  },

  title: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 20,
    textAlign: "center",
  },

  label: {
    fontSize: 14,
    marginBottom: 4,
    fontWeight: "500",
  },

  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    padding: 10,
    marginBottom: 15,
    borderRadius: 6,
  },

  buttonContainer: {
    marginTop: 10,
  },
});
