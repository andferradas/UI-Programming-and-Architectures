async function renderCollectionView() {
  const app = document.getElementById("app");

  // For doing with Live Server extension:
  // const page = await fetch("presentation/html/collection.html").then(r => r.text());
  app.innerHTML = `<div class="collections-view">
        <h1>Your Collections</h1>
        <div id="collectionsList">
        </div>
    </div>
    `;

  // Get current user
  const user = authService.getCurrentUser();
  const userCards = user?.cardsOwned || [];

  const allCollections = packService.getAllPackages();

  const container = document.getElementById("collectionsList");

  // Build each collection section
  allCollections.forEach(collection => {
    const totalCards = collection.cards.length;
    const ownedCards = collection.cards.filter(card => cardService.userOwnsCard(userCards, card.id)).length;

    const section = document.createElement("section");
    section.classList.add("collection-section");

    section.innerHTML = `
        <div class="collection-header">
            <img src="${collection.image}" class="collection-pack-img">
            <div class="collection-info">
                <h2>${collection.nameCollection}</h2>
                <p>${ownedCards} / ${totalCards} cards owned</p>
            </div>
        </div>

        <div class="cards-grid">
            ${collection.cards.map(card => {
                const hasCard = cardService.userOwnsCard(userCards, card.id);
                return `
                    <div class="card-item ${hasCard ? "owned" : "not-owned"}">
                        <img src="${card.image}" alt="${card.nameCard}">
                    </div>
                `;
            }).join("")}
        </div>
    `;
    container.appendChild(section);
  });
}
