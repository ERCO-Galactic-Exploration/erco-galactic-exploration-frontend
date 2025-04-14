const endpoint = import.meta.env.VITE_URL_BACKEND;

export const checkAuth = async () => {
  try {
    const response = await fetch(`${endpoint}/auth/me`, {
      method: 'GET',
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json',
      },
    });
    console.log('response checkAuth: ', response);

    if (!response.ok) {
      throw new Error('Not authenticated');
    }

    return await response.json();
  } catch (error) {
    console.error('Auth check failed:', error);
    return null;
  }
};
