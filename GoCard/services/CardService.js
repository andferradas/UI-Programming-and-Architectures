class CardService {
    getCardById(id) {
        return dataCards.find(c => c.id === Number(id));
    }

    userOwnsCard(userCards, cardId) {
        return userCards.map(id => Number(id)).includes(Number(cardId));
    }

    getOwnedCardsCount(userCards, collectionCardIds) {
        const userCardIds = userCards.map(id => Number(id));
        return collectionCardIds.filter(id => userCardIds.includes(Number(id))).length;
    }
}

window.cardService = new CardService();