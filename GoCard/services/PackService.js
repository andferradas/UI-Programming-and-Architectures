class PackService {
    getAllPackages() {
        return dataPackages.map(pack => {
            const cards = pack.cards.map(cardId => {
                const raw = dataCards.find(c => c.id === cardId);

                const factory = getFactory(raw);
                return factory.createCard(raw);
            });

            return new Package(pack.id, pack.nameCollection, pack.image, cards);
        });
    }

    getPackageById(id) {
        return this.getAllPackages().find(pack => pack.id === id);
    }
}

window.packService = new PackService();