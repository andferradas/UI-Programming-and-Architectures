// Abstract Creator
class CardFactory {
    createCard(cardData) {
        throw new Error("createCard() must be implemented by subclass");
    }
}

// Concrete Creators
class DinosaurCardFactory extends CardFactory {
    createCard(cardData) {
        return new DinosaurCard(
            cardData.id,
            cardData.nameCard,
            cardData.image,
            cardData.rarity,
            cardData.collectionId
        );
    }
}

class SpaceCardFactory extends CardFactory {
    createCard(cardData) {
        return new SpaceCard(
            cardData.id,
            cardData.nameCard,
            cardData.image,
            cardData.collectionId
        );
    }
}

// Factory Method helper
function getFactory(cardData) {
    switch(cardData.collectionId) {
        case 1: return new DinosaurCardFactory();
        case 2: return new SpaceCardFactory();
        default: throw new Error("Unknown collectionId: " + cardData.collectionId);
    }
}