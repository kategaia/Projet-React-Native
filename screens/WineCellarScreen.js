import {
  View,
  Text,
  ActivityIndicator,
  FlatList,
  Modal,
  Button,
  Alert
} from "react-native";
import { useEffect, useState } from "react";
import {
  getWineCellars,
  getBottlesForCellar,
  addBottleToCellar,
  deleteBottleFromCellar
} from "../services/fire";

import WineCellarCard from "../components/WineCellarCard";
import WineCellarForm from "../components/WineCellarForm";
import BottleForm from "../components/BottleForm";

export default function WineCellarScreen() {
  const [winecellars, setWinecellars] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedWinecellar, setSelectedWinecellar] = useState(null);
  const [visible, setVisible] = useState(false);

  const [bottles, setBottles] = useState([]);
  const [bottleModalVisible, setBottleModalVisible] = useState(false);
  const [addBottleVisible, setAddBottleVisible] = useState(false);

  useEffect(() => {
    getWineCellars((posts) => {
      setWinecellars(posts);
      setLoading(false);
    });
  }, []);

  const handleShowBottles = (cellar) => {
    setSelectedWinecellar(cellar);

    getBottlesForCellar(cellar.id, (data) => {
      setBottles(data);
      setBottleModalVisible(true);
    });
  };

  return (
    <View style={{ flex: 1 }}>
      {loading ? (
  <ActivityIndicator />
) : (
  <>
    <View style={{ padding: 12 }}>
      <Button
        title="Ajouter une cave"
        onPress={() => {
          setSelectedWinecellar(null); // mode création
          setVisible(true);            // ouvre le formulaire
        }}
      />
    </View>

    <FlatList
      data={winecellars}
      renderItem={({ item }) => (
        <WineCellarCard
          winecellar={item}
          setSelectedWinecellar={setSelectedWinecellar}
          setVisible={setVisible}
          onShowBottles={handleShowBottles}
        />
      )}
      keyExtractor={(item) => item.id}
    />
  </>
)}

      {/* MODAL EDIT CAVE */}
      <Modal visible={visible} animationType="slide">
        <View style={{ padding: 20 }}>
          <WineCellarForm
            setVisible={setVisible}
            selectedWinecellar={selectedWinecellar}
          />
          <Button title="Fermer" onPress={() => setVisible(false)} />
        </View>
      </Modal>

      {/* MODAL BOUTEILLES */}
      <Modal visible={bottleModalVisible} animationType="slide">
        <View style={{ flex: 1, padding: 20 }}>

          <Button
            title="Ajouter une bouteille"
            onPress={() => setAddBottleVisible(true)}
          />

          <FlatList
            data={bottles}
            keyExtractor={(item) => item.id}
            renderItem={({ item }) => (
              <View
                style={{
                  paddingVertical: 12,
                  borderBottomWidth: 1,
                  borderColor: "#ddd",
                }}
              >
                <Text style={{ fontSize: 18, fontWeight: "600" }}>
                  {item.name}
                </Text>
                <Text>Type : {item.type ?? "-"}</Text>
                <Text>Millésime : {item.vintage ?? "-"}</Text>
                <Text>Prix : {item.price ?? "-"} €</Text>
                <Text>Domaine : {item.domainName ?? "-"}</Text>
                <Text>Pays : {item.country ?? "-"}</Text>
                <Text>Cépage : {item.grapeVariety ?? "-"}</Text>
                <Text>Appellation : {item.appellation ?? "-"}</Text>
                <Text>Accord : {item.compatibleFood ?? "-"}</Text>
                <Text>Contenance : {item.bottleCapacity ?? "-"} L</Text>

                <View style={{ marginTop: 8 }}>
                  <Button
                    title="Supprimer"
                    color="red"
                    onPress={() =>
                      Alert.alert(
                        "Confirmation",
                        "Supprimer cette bouteille ?",
                        [
                          { text: "Annuler" },
                          {
                            text: "Supprimer",
                            style: "destructive",
                            onPress: () =>
                              deleteBottleFromCellar(
                                selectedWinecellar.id,
                                item
                              ),
                          },
                        ]
                      )
                    }
                  />
                </View>
              </View>
            )}
          />

          <Button
            title="Fermer"
            onPress={() => {
              setBottleModalVisible(false);
            }}
          />
        </View>
      </Modal>

      {/* MODAL AJOUT BOUTEILLE */}
      <Modal visible={addBottleVisible} animationType="slide">
        <View style={{ flex: 1 }}>
          <BottleForm
            onClose={() => setAddBottleVisible(false)}
            onSubmit={async (data) => {
                console.log("selectedWinecellar:", selectedWinecellar);
              await addBottleToCellar(selectedWinecellar.id, data);
              setAddBottleVisible(false);
            }}
          />
        </View>
      </Modal>
    </View>
  );
}
