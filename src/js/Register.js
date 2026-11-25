export default class Register {
  constructor() {
    this.storageKey = "sleepOutsideRegisterPrompt";
  }

  init() {
    const hasSeenPrompt = localStorage.getItem(this.storageKey);

    if (hasSeenPrompt) {
      return;
    }

    this.createModal();
    localStorage.setItem(this.storageKey, "shown");
  }

  createModal() {
    const modal = document.createElement("section");

    modal.classList.add("register-modal");
    modal.setAttribute("role", "dialog");
    modal.setAttribute("aria-modal", "true");
    modal.setAttribute("aria-labelledby", "register-title");

    modal.innerHTML = `
      <div class="register-modal__content">
        <button
          class="register-modal__close"
          type="button"
          aria-label="Close registration promotion"
        >
          &times;
        </button>

        <p class="register-modal__eyebrow">
          Welcome to Sleep Outside
        </p>

        <h2 id="register-title">Join Our Community!</h2>

        <p>
          Register with Sleep Outside for a chance to participate
          in our exclusive giveaway.
        </p>

        <p class="register-modal__highlight">
          Don't miss your opportunity to be part of the adventure!
        </p>

        <div class="register-modal__actions">
          <a
            class="register-modal__register"
            href="/register/"
          >
            Register Now
          </a>

          <button
            class="register-modal__dismiss"
            type="button"
          >
            Maybe Later
          </button>
        </div>
      </div>
    `;

    document.body.appendChild(modal);

    const closeModal = () => modal.remove();

    modal.querySelector(".register-modal__close")
      .addEventListener("click", closeModal);

    modal.querySelector(".register-modal__dismiss")
      .addEventListener("click", closeModal);

    modal.querySelector(".register-modal__close").focus();

    modal.addEventListener("keydown", (event) => {
      if (event.key === "Escape") {
        closeModal();
      }
    });
  }
}
