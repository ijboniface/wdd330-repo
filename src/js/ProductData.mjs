const baseURL = import.meta.env.VITE_SERVER_URL;

const categories = [
  "tents",
  "sleeping-bags",
  "backpacks",
  "hammocks",
];

async function convertToJson(response) {
  const data = await response.json().catch(() => null);

  if (!response.ok) {
    throw new Error(
      data?.message ||
      data?.Message ||
      `HTTP Error: ${response.status}`,
    );
  }

  return data;
}

export default class ProductData {
  async fetchCategory(category) {
    const searchTerm = encodeURIComponent(category);

    const response = await fetch(
      `${baseURL}products/search/${searchTerm}`,
    );

    const data = await convertToJson(response);
    const result = data?.Result;

    if (Array.isArray(result)) {
      return result;
    }

    if (result && typeof result === "object") {
      return [result];
    }

    return [];
  }

  async getData(category) {
    const searchTerm = category.trim().toLowerCase();

    // Preserve normal category browsing.
    if (categories.includes(searchTerm)) {
      return this.fetchCategory(searchTerm);
    }

    // Search across all available product categories.
    const categoryResults = await Promise.all(
      categories.map((item) => this.fetchCategory(item)),
    );

    const allProducts = categoryResults.flat();

    // Remove duplicate products.
    const uniqueProducts = [
      ...new Map(
        allProducts.map((product) => [product.Id, product]),
      ).values(),
    ];

    // Match product names, brands, and descriptions.
    return uniqueProducts.filter((product) => {
      const searchableText = [
        product.Name,
        product.NameWithoutBrand,
        product.Brand?.Name,
        product.DescriptionHtmlSimple,
      ]
        .filter(Boolean)
        .join(" ")
        .toLowerCase();

      return searchableText.includes(searchTerm);
    });
  }

  async findProductById(id) {
    const response = await fetch(`${baseURL}product/${id}`);
    const data = await convertToJson(response);

    return data.Result;
  }
}
