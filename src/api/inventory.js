// inventory.js - convenience helpers using products API
import * as productsApi from "./products";

export async function getInventory() {
  const products = await productsApi.getProducts();
  return products.map(p => ({ id: p.id, name: p.name, stock: p.stock || 0 }));
}
export async function updateStock(id, qty) {
  const p = await productsApi.getProductById(id);
  if (!p) throw new Error("Product not found");
  const updated = await productsApi.updateProduct(id, { stock: qty });
  return updated;
}
