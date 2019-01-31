export const getUser = () => {
  const token = localStorage.getItem('token');
  if (token) {
    const payload = atob(token.split('.')[1]);
    return JSON.parse(payload);
  }
  return null;
};

export const isAuth = () => {
  const payload = this.getUser();

  if (payload && payload.exp > Date.now() / 1000) {
    return payload.role;
  }

  return false;
};
