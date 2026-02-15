import { View, Text, TextInput, Button } from "react-native";
import { useState } from "react";

export default function BottleForm({ onSubmit, onClose }) {
  const [name, setName] = useState("");
  const [type, setType] = useState("");
  const [vintage, setVintage] = useState("");
  const [price, setPrice] = useState("");
  const [country, setCountry] = useState("");
  const [domain, setDomain] = useState("");
  const [grapeVariety, setGrapeVariety] =useState("");
  const [appelation, setAppelation] = useState("");
  const [bottleCapacity, setBottleCapacity] =useState("");
  const [compatibleFood, setCompatibleFood] = useState("");

  return (
    <View style={{ padding: 16 }}>
      <Text>Nom</Text>
      <TextInput
        value={name}
        onChangeText={setName}
        style={{ borderWidth: 1, padding: 8, marginBottom: 8 }}
      />

      <Text>Type</Text>
      <TextInput
        value={type}
        onChangeText={setType}
        style={{ borderWidth: 1, padding: 8, marginBottom: 8 }}
      />

      <Text>Millésime</Text>
      <TextInput
        value={vintage}
        onChangeText={setVintage}
        keyboardType="numeric"
        style={{ borderWidth: 1, padding: 8, marginBottom: 8 }}
      />

      <Text>Prix</Text>
      <TextInput
        value={price}
        onChangeText={setPrice}
        keyboardType="numeric"
        style={{ borderWidth: 1, padding: 8, marginBottom: 8 }}
      />

      <Text>Domaine</Text>
      <TextInput 
        value={domain}
        onChangeText={setDomain}
        style={{ borderWidth: 1, padding: 8, marginBottom: 8 }}
      />

      <Text>Pays</Text>
      <TextInput 
        value={country}
        onChangeText={setCountry}
        style={{ borderWidth: 1, padding: 8, marginBottom: 8 }}
      />

      <Text>Cépage</Text>
      <TextInput 
        value={grapeVariety}
        onChangeText={setGrapeVariety}
        style={{ borderWidth: 1, padding: 8, marginBottom: 8 }}
      />

      <Text>Appelation</Text>
      <TextInput 
        value={appelation}
        onChangeText={setAppelation}
        style={{ borderWidth: 1, padding: 8, marginBottom: 8 }}
      />

      <Text>Capacité</Text>
      <TextInput 
        value={bottleCapacity}
        onChangeText={setBottleCapacity}
        style={{ borderWidth: 1, padding: 8, marginBottom: 8 }}
      />

      <Text>Accord</Text>
      <TextInput 
        value={compatibleFood}
        onChangeText={setCompatibleFood}
        style={{ borderWidth: 1, padding: 8, marginBottom: 8 }}
      />

    <Button title='Ajouter'
    onPress={() => onSubmit({
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
    })
    }
    />

    <Button title='Annuler' onPress={onClose}/>
    
    </View>
  );
}
