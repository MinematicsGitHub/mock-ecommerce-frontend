import { readStorage, storageKeys, writeStorage } from "./storage";

export function getStoredUsers() {
  return readStorage(storageKeys.users, []);
}

export function registerUser({ fullName, email, password }) {
  const users = getStoredUsers();
  const normalizedEmail = email.trim().toLowerCase();
  const exists = users.some((user) => user.email === normalizedEmail);

  if (exists) {
    return { ok: false, message: "An account already exists for this email." };
  }

  const newUser = {
    id: Date.now().toString(),
    fullName: fullName.trim(),
    email: normalizedEmail,
    password,
    createdAt: new Date().toISOString(),
  };

  writeStorage(storageKeys.users, [...users, newUser]);
  writeStorage(storageKeys.currentUser, newUser);

  return { ok: true, user: newUser };
}

export function loginUser({ email, password }) {
  const users = getStoredUsers();
  const normalizedEmail = email.trim().toLowerCase();
  const user = users.find(
    (storedUser) =>
      storedUser.email === normalizedEmail && storedUser.password === password
  );

  if (!user) {
    return { ok: false, message: "Invalid email or password." };
  }

  writeStorage(storageKeys.currentUser, user);
  return { ok: true, user };
}

export function logoutUser() {
  window.localStorage.removeItem(storageKeys.currentUser);
}
