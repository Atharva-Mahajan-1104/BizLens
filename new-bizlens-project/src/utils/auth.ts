interface LoginCredentials {
  email: string;
  password: string;
}

interface RegisterCredentials extends LoginCredentials {
  username: string; // Changed from `name` to `username`
}

export async function loginUser({ email, password }: LoginCredentials) {
  const response = await fetch('http://localhost:8080/auth/login', { // Correct URL
      method: 'POST',
      headers: {
          'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email, password }),
  });

  const data = await response.json();

  if (!data.success) {
      throw new Error(data.message || 'Login failed');
  }

  return data;
}

export async function registerUser({ username, email, password }: RegisterCredentials) {
  const response = await fetch('http://localhost:8080/auth/register', { // Correct URL
      method: 'POST',
      headers: {
          'Content-Type': 'application/json',
      },
      body: JSON.stringify({ username, email, password }), // Changed from `name` to `username`
  });

  const data = await response.json();

  if (!data.success) {
      throw new Error(data.message || 'Registration failed');
  }

  return data;
}
