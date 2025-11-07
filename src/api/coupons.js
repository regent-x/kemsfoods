// coupons.js - localStorage coupons
const KEY = "kems_coupons_v1";

function read() {
  const raw = localStorage.getItem(KEY);
  if (!raw) {
    localStorage.setItem(KEY, JSON.stringify([]));
    return [];
  }
  try {
    return JSON.parse(raw);
  } catch {
    localStorage.setItem(KEY, JSON.stringify([]));
    return [];
  }
}
function write(list) {
  localStorage.setItem(KEY, JSON.stringify(list));
}

export async function listCoupons() {
  return read();
}

export async function createCoupon(coupon) {
  const list = read();
  list.push(coupon);
  write(list);
  return coupon;
}

export async function validateCoupon(code, subtotal) {
  const coupon = read().find(c => c.code.toUpperCase() === String(code).toUpperCase());
  if (!coupon) return { valid: false, reason: "Not found" };
  const now = Date.now();
  if (coupon.expiresAt && now > coupon.expiresAt) return { valid: false, reason: "Expired" };
  if (coupon.minAmount && subtotal < coupon.minAmount) return { valid: false, reason: "Minimum not met" };
  return { valid: true, coupon };
}

export async function deleteCoupon(code) {
  const list = read().filter(c => c.code.toUpperCase() !== String(code).toUpperCase());
  write(list);
  return true;
}
