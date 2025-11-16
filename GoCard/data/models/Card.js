export class Card {
    constructor(id, nameCard, image, collectionId) {
        this.id = id;
        this.nameCard = nameCard;
        this.image = image;
        this.collectionId = collectionId;
    }
}

export class DinosaurCard extends Card {
    constructor(id, nameCard, image, rarity, collectionId) {
        super(id, nameCard, image, collectionId);
        this.rarity = rarity;
    }
}

export class SpaceCard extends Card {
    constructor(id, nameCard, image, collectionId) {
        super(id, nameCard, image, collectionId);
    }
}