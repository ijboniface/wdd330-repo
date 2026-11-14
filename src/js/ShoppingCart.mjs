import { getLocalStorage, renderListWithTemplate } from "./utils.mjs";

function cartItemTemplate(item) {
  const image =
    item.Images?.PrimaryMedium ||
    item.Images?.PrimaryLarge ||
    "";

  const color = item.Colors?.[0]?.ColorName || "N/A";

  return `
    <li class="cart-card divider">
      <a href="#" class="cart-card__image">
        <img
          src="${image}"
          alt="${item.Name}"
        />
      </a>

      <a href="#">
        <h2 class="card__name">${item.Name}</h2>
      </a>

      <p class="cart-card__color">${color}</p>
      <p class="cart-card__quantity">qty: 1</p>
      <p class="cart-card__price">$${item.FinalPrice}</p>
    </li>
  `;
}

export default class ShoppingCart {
  constructor(key, listElement) {
    this.key = key;
    this.listElement = listElement;
  }

  init() {
    const cartItems = getLocalStorage(this.key) || [];

    if (cartItems.length === 0) {
      this.listElement.innerHTML =
        `<li class="cart-empty">Your cart is empty.</li>`;
      return;
    }

    this.renderList(cartItems);
  }

  renderList(list) {
    renderListWithTemplate(
      cartItemTemplate,
      this.listElement,
      list,
    );
  }
}