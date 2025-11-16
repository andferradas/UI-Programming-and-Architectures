import { DinosaurCard, SpaceCard } from "/data/models/Card.js";

export class CardFactory {
    static create(cardData) {
        switch (cardData.collectionId) {
            case 1: // Dinosaur collection
                return new DinosaurCard(
                    cardData.id,
                    cardData.nameCard,
                    cardData.image,
                    cardData.rarity,
                    cardData.collectionId
                );

            case 2: // Space collection
                return new SpaceCard(
                    cardData.id,
                    cardData.nameCard,
                    cardData.image,
                    cardData.collectionId
                );

            default:
                throw new Error("Collection not found: " + cardData.collectionId);
        }
    }
}
