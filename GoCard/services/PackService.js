import { dataPackages, dataCards } from "/data/data.js";
import { Package } from "/data/models/Package.js";
import { DinosaurCard, Card, SpaceCard } from "/data/models/Card.js";

class PackService {
    getAllPackages() {
        return dataPackages.map(pack => {
            // Convert IDs to Card objects
            const cards = pack.cards.map(cardId => {
                const raw = dataCards.find(c => c.id === cardId);

                // Choose constructor based on collectionId
                if (raw.collectionId === 1) {
                    return new DinosaurCard(raw.id, raw.nameCard, raw.image, raw.rarity, raw.collectionId);
                } else {
                    return new SpaceCard(raw.id, raw.nameCard, raw.image, raw.collectionId);
                }
            });

            return new Package(
                pack.id,
                pack.nameCollection,
                pack.image,
                cards
            );
        });
    }

    getPackageById(id) {
        return this.getAllPackages().find(pack => pack.id === id);
    }
}

export const packService = new PackService();
