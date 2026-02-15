import { View, Text, StyleSheet, Button, TextInput } from 'react-native'
import { use, useState} from 'react'
import { addWineCellar, updateWineCellar, addBottleToCellar } from '../services/fire'

export default function WineCellarForm({setVisible, selectedWinecellar}) {
    const [name, onChangeName] = useState(selectedWinecellar?.name)
    const [bottlesNumber, onChangeBottlesNumber] = useState(selectedWinecellar?.bottlesNumber)
    const [capacity, onChangeCapacity] = useState(selectedWinecellar?.capacity)

    const handleSubmit = () => {
        let winecellar = {
            name: name,
            bottlesNumber: bottlesNumber,
            capacity: capacity,
            bottles: []
        }
    
        if (selectedWinecellar) {
            winecellar.id = selectedWinecellar.id
            winecellar.bottles = selectedWinecellar.bottles
            winecellar.name = selectedWinecellar.name
        } else {
            addWineCellar(winecellar)
        } 
        setVisible(false)
    }

    return (
    <View>
        <Text>Nom de la Cave</Text>
        <TextInput
        style={styles.input}
        onChangeText={onChangeName}
        value={name}
        />

        <Text>Capacité max de la cave</Text>
        <TextInput
        style={styles.input}
        onChangeText={onChangeCapacity}
        value={capacity}
        />

        <Text>Nombre de bouteilles dans la cave</Text>
        <TextInput
        style={styles.input}
        onChangeText={onChangeBottlesNumber}
        value={bottlesNumber}
        />

        <Button
  onPress={handleSubmit}
  title={selectedWinecellar ? "Modifier" : "Créer"}
/>

        <Button onPress={() => {
            if (!selectedWinecellar) return;
        }} title='Ajouter une bouteille'/>

    </View>
  )
}

const styles = StyleSheet.create({
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    padding: 10,
    marginVertical: 8,
    borderRadius: 6,
  },
});