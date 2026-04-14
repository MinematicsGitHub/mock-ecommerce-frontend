export const storageKeys = {
  cart: "novacart_cart",
  currentUser: "novacart_current_user",
  users: "novacart_users",
  wishlist: "novacart_wishlist",
  theme: "novacart_theme",
};

export function readStorage(key, fallback) {
  try {
    const item = window.localStorage.getItem(key);
    return item ? JSON.parse(item) : fallback;
  } catch {
    return fallback;
  }
}

export function writeStorage(key, value) {
  window.localStorage.setItem(key, JSON.stringify(value));
}
