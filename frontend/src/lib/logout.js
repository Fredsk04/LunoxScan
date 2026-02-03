export default async function logout() {
  const token = localStorage.getItem('token');
  try {
    if (token) {
      await fetch('http://localhost:4000/api/auth/logout', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
      });
    }
  } catch (err) {
    // ignore network errors
  } finally {
    localStorage.removeItem('token');
    window.location.href = '/auth';
  }
}