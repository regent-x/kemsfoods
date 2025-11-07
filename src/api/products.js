// products.js - simulated API using localStorage
import { PRODUCTS as seed } from "../data";

const KEY = "kems_products_v1";

function read() {
  const raw = localStorage.getItem(KEY);
  if (!raw) {
    localStorage.setItem(KEY, JSON.stringify(seed));
    return seed;
  }
  try {
    return JSON.parse(raw);
  } catch {
    localStorage.setItem(KEY, JSON.stringify(seed));
    return seed;
  }
}
function write(list) {
  localStorage.setItem(KEY, JSON.stringify(list));
}
export async function getProducts() {
  return read();
}
export async function getProductById(id) {
  return read().find(p => p.id === id) || null;
}
export async function createProduct(product) {
  const list = read();
  list.push(product);
  write(list);
  return product;
}
export async function updateProduct(id, patch) {
  const list = read().map(p => (p.id === id ? { ...p, ...patch } : p));
  write(list);
  return list.find(p => p.id === id);
}
export async function deleteProduct(id) {
  const list = read().filter(p => p.id !== id);
  write(list);
  return true;
}
