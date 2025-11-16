import { packService } from "/services/PackService.js";
import { renderUserView } from "./UserView.js";
import { renderOpenedCardView } from "./OpenedCardView.js";

export async function renderPackageView(packId) {
    const app = document.getElementById("app");

    const page = await fetch("/presentation/html/package.html").then(r => r.text());
    app.innerHTML = page;

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
