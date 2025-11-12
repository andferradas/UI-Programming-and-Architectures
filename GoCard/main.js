// A file with only import statements

import "./data.js";
import {startApp} from "./app.js";
import "./models/Card.js";
import "./models/Observer.js";
import "./models/User.js";
import "./services/AuthService.js";
import "./services/CardFactory.js";
import "./services/NotifyService.js";
import "./views/AuthView.js";
import "./views/CardView.js";
import "./views/TransactionView.js";
import "./views/UserView.js";

startApp();