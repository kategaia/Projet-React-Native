import {
  View,
  Text,
  ActivityIndicator,
  FlatList,
  Modal,
  Alert,
  ScrollView,
  TouchableOpacity,
  TextInput,
} from "react-native";
import { useEffect, useState } from "react";
import {
  getWineCellars,
  getBottlesForCellar,
  addBottleToCellar,
  deleteBottleFromCellar,
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

  // 🔎 Recherche bouteilles
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    getWineCellars((posts) => {
      setWinecellars(posts);
      setLoading(false);
    });
  }, []);

  const handleShowBottles = (cellar) => {
    setSelectedWinecellar(cellar);
    setSearchQuery(""); // reset recherche à l'ouverture

    getBottlesForCellar(cellar.id, (data) => {
      setBottles(data);
      setBottleModalVisible(true);
    });
  };

  const filteredBottles = bottles.filter((bottle) => {
    const q = searchQuery.trim().toLowerCase();
    if (!q) return true;

    return (
      bottle?.name?.toLowerCase().includes(q) ||
      bottle?.position?.toLowerCase().includes(q) ||
      bottle?.vintage?.toString().includes(q)
    );
  });

  return (
    <View style={styles.container}>
      {loading ? (
        <ActivityIndicator size="large" color="#8B0000" />
      ) : (
        <>
          <View style={styles.header}>
            <TouchableOpacity
              style={styles.primaryButton}
              onPress={() => {
                setSelectedWinecellar(null);
                setVisible(true);
              }}
            >
              <Text style={styles.primaryButtonText}>+ Ajouter une cave</Text>
            </TouchableOpacity>
          </View>

          <FlatList
            data={winecellars}
            keyExtractor={(item) => item.id}
            contentContainerStyle={styles.listContent}
            renderItem={({ item }) => (
              <WineCellarCard
                winecellar={item}
                setSelectedWinecellar={setSelectedWinecellar}
                setVisible={setVisible}
                onShowBottles={handleShowBottles}
              />
            )}
          />
        </>
      )}

      {/* MODAL EDIT CAVE */}
      <Modal visible={visible} animationType="fade" transparent>
        <View style={styles.overlay}>
          <View style={styles.modalCard}>
            <Text style={styles.modalTitle}>
              {selectedWinecellar
                ? "Modifier la cave"
                : "Créer une nouvelle cave"}
            </Text>

            <ScrollView showsVerticalScrollIndicator={false}>
              <WineCellarForm
                setVisible={setVisible}
                selectedWinecellar={selectedWinecellar}
              />
            </ScrollView>

            <TouchableOpacity
              style={styles.secondaryButton}
              onPress={() => setVisible(false)}
            >
              <Text style={styles.secondaryButtonText}>Fermer</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>

      {/* MODAL BOUTEILLES */}
      <Modal visible={bottleModalVisible} animationType="fade" transparent>
        <View style={styles.overlay}>
          <View style={styles.modalCardLarge}>
            <View style={styles.modalHeader}>
              <Text style={styles.modalTitle}>
                {selectedWinecellar?.name ?? "Contenu de la cave"}
              </Text>

              <TouchableOpacity
                style={styles.primaryButtonSmall}
                onPress={() => setAddBottleVisible(true)}
              >
                <Text style={styles.primaryButtonText}>Ajouter</Text>
              </TouchableOpacity>
            </View>

            {/* 🔎 Barre de recherche */}
            <TextInput
              style={styles.searchInput}
              placeholder="Rechercher par nom, position ou année..."
              placeholderTextColor="#888"
              value={searchQuery}
              onChangeText={setSearchQuery}
            />

            <FlatList
              data={filteredBottles}
              keyExtractor={(item) => item.id}
              contentContainerStyle={{ paddingBottom: 10 }}
              renderItem={({ item }) => (
                <View style={styles.bottleCard}>
                  <Text style={styles.bottleTitle}>{item.name}</Text>

                  <View style={styles.bottleDetails}>
                    <Text style={styles.detailText}>
                      Type : {item.type ?? "-"}
                    </Text>
                    <Text style={styles.detailText}>
                      Millésime : {item.vintage ?? "-"}
                    </Text>
                    <Text style={styles.detailText}>
                      Prix : {item.price ?? "-"} €
                    </Text>
                    <Text style={styles.detailText}>
                      Domaine : {item.domain ?? "-"}
                    </Text>
                    <Text style={styles.detailText}>
                      Pays : {item.country ?? "-"}
                    </Text>
                    <Text style={styles.detailText}>
                      Cépage : {item.grapeVariety ?? "-"}
                    </Text>
                    <Text style={styles.detailText}>
                      Appellation : {item.appelation ?? "-"}
                    </Text>
                    <Text style={styles.detailText}>
                      Contenance : {item.bottleCapacity ?? "-"} L
                    </Text>
                    <Text style={styles.detailText}>
                      Accord : {item.compatibleFood ?? "-"}
                    </Text>
                    <Text style={styles.detailText}>
                      Position : {item.position ?? "-"}
                    </Text>
                  </View>

                  <TouchableOpacity
                    style={styles.deleteButton}
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
                                item,
                              ),
                          },
                        ],
                      )
                    }
                  >
                    <Text style={styles.deleteButtonText}>Supprimer</Text>
                  </TouchableOpacity>
                </View>
              )}
            />

            <TouchableOpacity
              style={styles.secondaryButton}
              onPress={() => {
                setBottleModalVisible(false);
                setSearchQuery("");
              }}
            >
              <Text style={styles.secondaryButtonText}>Fermer</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>

      {/* MODAL AJOUT BOUTEILLE */}
      <Modal visible={addBottleVisible} animationType="fade" transparent>
        <View style={styles.overlay}>
          <View style={styles.modalCardScrollable}>
            <Text style={styles.modalTitle}>Ajouter une bouteille</Text>

            <ScrollView showsVerticalScrollIndicator={false}>
              <BottleForm
                onClose={() => setAddBottleVisible(false)}
                onSubmit={async (data) => {
                  await addBottleToCellar(selectedWinecellar.id, data);
                  setAddBottleVisible(false);
                }}
              />
            </ScrollView>

            <TouchableOpacity
              style={styles.secondaryButton}
              onPress={() => setAddBottleVisible(false)}
            >
              <Text style={styles.secondaryButtonText}>Fermer</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </View>
  );
}

const styles = {
  container: {
    flex: 1,
    backgroundColor: "#ffffff",
  },

  header: {
    padding: 16,
  },

  listContent: {
    paddingBottom: 20,
  },

  overlay: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.45)",
    justifyContent: "center",
    alignItems: "center",
  },

  modalCard: {
    width: "90%",
    backgroundColor: "#fff",
    borderRadius: 18,
    padding: 20,
    elevation: 8,
  },

  modalCardLarge: {
    width: "95%",
    height: "80%",
    backgroundColor: "#fff",
    borderRadius: 18,
    padding: 20,
    elevation: 8,
  },

  modalCardScrollable: {
    width: "90%",
    maxHeight: "85%",
    backgroundColor: "#fff",
    borderRadius: 18,
    padding: 20,
    elevation: 8,
  },

  modalTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 12,
  },

  modalHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 10,
  },

  primaryButton: {
    backgroundColor: "#8B0000",
    padding: 12,
    borderRadius: 10,
    alignItems: "center",
  },

  primaryButtonSmall: {
    backgroundColor: "#8B0000",
    paddingHorizontal: 14,
    paddingVertical: 8,
    borderRadius: 8,
  },

  primaryButtonText: {
    color: "#fff",
    fontWeight: "600",
  },

  secondaryButton: {
    marginTop: 12,
    padding: 10,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: "#8B0000",
    alignItems: "center",
  },

  secondaryButtonText: {
    color: "#8B0000",
    fontWeight: "600",
  },

  searchInput: {
    backgroundColor: "#f2f2f2",
    padding: 10,
    borderRadius: 10,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: "#ddd",
  },

  emptyText: {
    textAlign: "center",
    color: "#777",
    marginTop: 20,
  },

  bottleCard: {
    backgroundColor: "#f5f5f5",
    padding: 14,
    borderRadius: 12,
    marginBottom: 12,
  },

  bottleTitle: {
    fontSize: 16,
    fontWeight: "600",
  },

  bottleInfo: {
    fontSize: 14,
    color: "#555",
    marginTop: 4,
  },

  bottleMeta: {
    fontSize: 13,
    color: "#666",
    marginTop: 6,
  },

  bottleDetails: {
    marginTop: 8,
  },

  detailText: {
    fontSize: 14,
    marginBottom: 3,
    color: "#444",
  },

  deleteButton: {
    marginTop: 10,
    alignSelf: "flex-start",
  },

  deleteButtonText: {
    color: "#b00020",
    fontWeight: "600",
  },
};
