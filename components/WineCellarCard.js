import { Button, Text, Card } from 'react-native-paper'
import { deleteWineCellar } from '../services/fire'

export default function WineCellarCard({
    winecellar,
    setSelectedWinecellar,
    setVisible,
    onShowBottles
}) {
  return (
    <Card>
        <Card.Title title={winecellar.name} />
        <Card.Content>
            <Text variant='titleLarge'>{winecellar.name}</Text>
            <Text variant='bodyMedium'>{winecellar.bottlesNumber}</Text>
            <Text variant='bodyMedium'>{winecellar.capacity}</Text>
            <Text variant='bodyMedium'>Bouteilles: {Array.isArray(winecellar?.bottles) ? winecellar.bottles.length : 0}</Text>
        </Card.Content>
        <Card.Actions>
            <Button
            onPress={() => {
                setSelectedWinecellar(winecellar)
                setVisible(true)
            }}
            >
                Modifier
            </Button>
            <Button onPress={() => deleteWineCellar(winecellar)}>Supprimer</Button>

            <Button onPress={() => onShowBottles(winecellar)}>Afficher Contenu</Button>
        </Card.Actions>
    </Card>
  )
}
