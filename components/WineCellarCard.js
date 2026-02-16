import { View } from "react-native";
import { Button, Text, Card } from "react-native-paper";
import { deleteWineCellar } from "../services/fire";

export default function WineCellarCard({
  winecellar,
  setSelectedWinecellar,
  setVisible,
  onShowBottles,
}) {
  return (
    <Card style={styles.card}>
      <Card.Title title={winecellar.name} />

      <Card.Content>
        <Text variant="titleLarge">{winecellar.name}</Text>
        <Text variant="bodyMedium">Capacité : {winecellar.capacity}</Text>
        <Text variant="bodyMedium">
          Bouteilles :{" "}
          {Array.isArray(winecellar?.bottles) ? winecellar.bottles.length : 0}
        </Text>
      </Card.Content>

      <Card.Actions style={styles.actionsContainer}>
        <View style={styles.topRow}>
          <View style={styles.halfWidth}>
            <Button
              mode="contained"
              onPress={() => {
                setSelectedWinecellar(winecellar);
                setVisible(true);
              }}
            >
              Modifier
            </Button>
          </View>

          <View style={styles.halfWidth}>
            <Button
              mode="outlined"
              textColor="red"
              onPress={() => deleteWineCellar(winecellar)}
            >
              Supprimer
            </Button>
          </View>
        </View>

        <View style={styles.bottomRow}>
          <View style={styles.halfWidth}>
            <Button
              mode="contained-tonal"
              onPress={() => onShowBottles(winecellar)}
            >
              Afficher contenu
            </Button>
          </View>
        </View>
      </Card.Actions>
    </Card>
  );
}

const styles = {
  card: {
    marginVertical: 10,
    marginHorizontal: 12,
  },

  actionsContainer: {
    flexDirection: "column",
    width: "100%",
  },

  topRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: "100%",
  },

  bottomRow: {
    marginTop: 8,
    alignItems: "flex-start",
    width: "100%",
  },

  halfWidth: {
    flex: 1,
    marginHorizontal: 4,
  },
};
