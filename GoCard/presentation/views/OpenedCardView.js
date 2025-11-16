import { renderPackageView } from "./PackageView.js";

export function renderOpenedCardView(card, packId) {
    const app = document.getElementById("app");

    fetch("/presentation/html/opened_card.html")
        .then(r => r.text())
        .then(page => {
            app.innerHTML = page;

            // Show the image of the obtained card
            document.getElementById("openedCardImage").src = card.image;

            // Back button to return to the package
            document.getElementById("backToPackagesBtn").addEventListener("click", () => {
                renderPackageView(packId);
            });
        });
}
