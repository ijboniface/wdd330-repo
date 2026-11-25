import Alert from "./Alert.js";
import Register from "./Register.js";
import { loadHeaderFooter } from "./utils.mjs";

loadHeaderFooter();

const alert = new Alert();
alert.init();

const register = new Register();
register.init();
