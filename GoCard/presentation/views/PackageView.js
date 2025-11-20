async function renderPackageView(packId) {
    const app = document.getElementById("app");

    /* For doing with Live Server extension:
    const page = await fetch("presentation/html/package.html").then(r => r.text());
    app.innerHTML = page;
    */
    app.innerHTML = `<div class="package-view">
        <button id="backBtn" class="back-btn-common">⬅ Back</button>

        <h1 id="packTitle"></h1>
        <img id="packImage" class="pack-big-image" />

        <p id="packtext">This package contains one of the following cards:</p>

        <div id="cardsContainer" class="cards-grid">
        </div>
    </div>
    `;

    const pack = packService.getPackageById(packId);

    if (!pack) {
        app.innerHTML = "<p>Error: Package not found.</p>";
        return;
    }

    document.getElementById("packTitle").textContent = pack.nameCollection;
    document.getElementById("packImage").src = pack.image;

    const cardsContainer = document.getElementById("cardsContainer");

    // Show every card in the package
    pack.cards.forEach(card => {
        const div = document.createElement("div");
        div.classList.add("card-item");
        div.innerHTML = `
            <img src="${card.image}" alt="${card.nameCard}">
        `;
        cardsContainer.appendChild(div);
    });

    // Click on the package image to open a random card
    document.getElementById("packImage").addEventListener("click", () => {
        const randomCard = pack.cards[Math.floor(Math.random() * pack.cards.length)];
        renderOpenedCardView(randomCard, packId);
    });

    document.getElementById("backBtn").addEventListener("click", () => {
        renderUserView();
    });
}
