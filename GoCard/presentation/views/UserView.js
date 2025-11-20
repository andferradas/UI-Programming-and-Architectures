async function renderUserView() {
  const app = document.getElementById('app');
  const headerRoot = document.getElementById('header-root');
  headerRoot.style.display = "block";

  /* For doing with Live Server extension:
  const page = await fetch("presentation/html/user_home.html").then(r => r.text());
  app.innerHTML = page;
  */
  app.innerHTML = `<main class="home-container">
    <!-- Sidebar menu -->
    <nav class="sidebar-menu">
      <ul>
        <li id="menu-collections">📦 Collections</li>
        <li id="menu-create-card">✏️ Create Card</li>
        <li id="menu-users">👤 Users</li>
        <li id="menu-posts">📰 Posts</li>
      </ul>
    </nav>

    <!-- Main content -->
    <div class="content-area">
      <h1 class="home-title">Available Packs</h1>
      <div class="packs-grid" id="packsContainer"></div>
    </div>
  </main>
  `;

  /* For doing with Live Server extension:
  const header = await fetch("presentation/html/user_header.html").then(r => r.text());
  headerRoot.innerHTML = header;
  */
  headerRoot.innerHTML = `<header class="user-header">
    <div class="header-left">
      <img src="assets/GoCard_logo_circle.png" class="header-logo">
      <button id="homeBtn" class="home-btn">🏠 Home</button>
    </div>

    <div class="header-center">
      <img id="user-avatar" src="" alt="User Avatar" class="user-avatar">
      <h2 id="userName"></h2>
    </div>

    <button id="logoutBtn" class="logout-btn">Logout</button>
  </header>
  `;

  const user = authService.getCurrentUser();
  document.getElementById("userName").textContent = user.name;
  document.getElementById("user-avatar").src = user.avatar;

  const packs = packService.getAllPackages();
  const container = document.getElementById("packsContainer");
  
  packs.forEach(pack => {
    const card = document.createElement("div");
    card.classList.add("pack-card");
    card.innerHTML = `
      <img src="${pack.image}" alt="${pack.nameCollection}">
      <h3>${pack.nameCollection}</h3>
    `;
    card.addEventListener("click", () => {
      renderPackageView(pack.id);
    });
    container.appendChild(card);
  });

  document.getElementById("homeBtn").addEventListener("click", () => {
    renderUserView();
  });

  document.getElementById("logoutBtn").addEventListener("click", () => {
    authService.logout();
    const headerRoot = document.getElementById('header-root');
    headerRoot.innerHTML = "";  
    headerRoot.style.display = "none";
    renderLoginView();
  });

  document.getElementById("menu-collections").addEventListener("click", () => {
    renderCollectionView();
  });

  document.getElementById("menu-create-card").addEventListener("click", async () => {
    renderCreateCardView();
  });

  document.getElementById("menu-users").addEventListener("click", () => {
    renderPageUsersView();
  });

  document.getElementById("menu-posts").addEventListener("click", () => {
    renderPostsView();
  });

}
