// Check if user is already logged in
function startApp() {
  const currentUser = authService.getCurrentUser();
  if (currentUser) {
      renderUserView();
  } else {
    renderLoginView();
  }
}
