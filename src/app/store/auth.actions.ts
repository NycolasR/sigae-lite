export const LOGIN = 'LOGIN';
export const LOGOUT = 'LOGOUT';
export const SALVAR_TOKEN = 'SALVAR_TOKEN';
export const DELETAR_TOKEN = 'DELETAR_TOKEN';

export const login = (username: string, password: string) => ({
  type: LOGIN,
  payload: { username, password },
});

export const logout = () => ({
  type: LOGOUT,
});

export const salvarToken = (token: string) => ({
  type: SALVAR_TOKEN,
  payload: { token },
});

export const deletarToken = () => ({
  type: DELETAR_TOKEN,
});
