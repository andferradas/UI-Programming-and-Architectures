// A file with only import statements

// Data layer
import "/data/data.js";
import "/data/models/Card.js";
import "/data/models/Observer.js";
import "/data/models/Package.js";
import "/data/models/User.js";
import "/data/models/Command/ClearCommand.js";
import "/data/models/Command/Command.js";
import "/data/models/Command/DrawCommand.js";

// Presentation layer
import "/presentation/views/AuthView.js";
import "/presentation/views/CardView.js";
import "/presentation/views/CreateCardView.js";
import "/presentation/views/PackageView.js";
import "/presentation/views/TransactionView.js";
import "/presentation/views/UserView.js";

// Service logic layer
import "/services/AuthService.js";
import "/services/CardFactory.js";
import "/services/CommandService.js";
import "/services/HistoryService.js";
import "/services/NotifyService.js";
import "/services/PackService.js";

// App entry point
import { startApp } from "/app.js";

window.addEventListener("DOMContentLoaded", () => {
  // Esperamos la duración total del splash (1300ms delay + 700ms fade)
  setTimeout(() => {
    startApp();
  }, 1500);
});

