import ProductData from "./ProductData.mjs";
import ProductList from "./ProductList.mjs";
import { getParam, loadHeaderFooter } from "./utils.mjs";

loadHeaderFooter();

const category = getParam("category");
const dataSource = new ProductData();
const listElement = document.querySelector(".product-list");
const categoryTitle = document.querySelector("#category-title");

if (category && listElement) {
  const formattedCategory = category
    .replaceAll("-", " ")
    .replace(/\b\w/g, (letter) => letter.toUpperCase());

  categoryTitle.textContent = formattedCategory;

  const productList = new ProductList(
    category,
    dataSource,
    listElement,
  );

  productList.init().catch((error) => {

    listElement.innerHTML = "<li>Unable to load products. Please try again.</li>";
  });
} else if (categoryTitle) {
  categoryTitle.textContent = "Category not specified";
}
