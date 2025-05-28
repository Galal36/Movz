// Mock database of registered users
export const registeredUsers = [
  {
    email: 'user@example.com',
    password: 'Password123!',
    name: 'Test User',
    username: 'testuser'
  }
];

export const authenticateUser = async (email, password) => {
  const user = registeredUsers.find(u =>
    u.email === email && u.password === password
  );
  return !!user;
};

export const isEmailRegistered = async (email) => {
  return registeredUsers.some(u => u.email === email);
};

export const registerUser = async (userData) => {
  if (await isEmailRegistered(userData.email)) {
    throw new Error('Email already registered');
  }
  registeredUsers.push(userData);
  return true;
};