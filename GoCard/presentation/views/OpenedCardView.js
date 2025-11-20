function renderOpenedCardView(card, packId) {
    const app = document.getElementById("app");

    app.innerHTML = `<div class="opened-card-view">
        <button id="backToPackagesBtn" class="back-btn-common back-btn-fixed">⬅ Back</button>
        <h1>You got this card!</h1>
        <img id="openedCardImage" class="opened-card-img" />
    </div>
    `;

    document.getElementById("openedCardImage").src = card.image;

    document.getElementById("backToPackagesBtn").addEventListener("click", () => {
        renderPackageView(packId);
    });
}
