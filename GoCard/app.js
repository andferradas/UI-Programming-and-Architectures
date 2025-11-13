import { renderLoginView } from "./presentation/views/AuthView.js";
import { authService } from "./services/AuthService.js";

// Check if user is already logged in
export function startApp() {
  const currentUser = authService.getCurrentUser();
  if (currentUser) {
    import("./presentation/views/UserView.js").then(({ renderUserView }) => {
      renderUserView();
    });
  } else {
    renderLoginView();
  }
}
