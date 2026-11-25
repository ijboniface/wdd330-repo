import { loadHeaderFooter } from "./utils.mjs";

loadHeaderFooter();

const registerForm = document.querySelector("#register-form");
const registerMessage = document.querySelector("#register-message");

if (registerForm && registerMessage) {
  registerForm.addEventListener("submit", (event) => {
    event.preventDefault();

    if (!registerForm.checkValidity()) {
      registerForm.reportValidity();
      return;
    }

    const firstName = document.querySelector("#firstName").value.trim();

    registerMessage.textContent =
      `Thank you, ${firstName}! Your registration details have been validated.`;

    registerMessage.classList.add("register-success");
    	registerForm.reset();
  });
}
