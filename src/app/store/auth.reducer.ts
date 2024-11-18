import { Action } from '@ngrx/store';
import { LOGIN, LOGOUT, SALVAR_TOKEN, DELETAR_TOKEN } from './auth.actions';

export interface AuthState {
  username: string | null;
  token: string | null;
  error: string | null;
}

export interface AuthAction extends Action {
  payload?: {
    username?: string;
    password?: string;
    token?: string;
  };
}

const initialState: AuthState = {
  username: null,
  token: null,
  error: null,
};

export const authReducer = (
  state: AuthState = initialState,
  action: AuthAction
): AuthState => {
  const validUsers = [
    { username: 'user@viceri.com', password: 'user123' },
    { username: 'admin@viceri.com', password: 'admin123' },
  ];

  switch (action.type) {
    case LOGIN:
      const user = validUsers.find(
        (u) => u.username === action.payload?.username
      );

      if (!user) {
        return {
          ...state,
          username: null,
          token: null,
          error: 'Este usuário não foi encontrado.',
        };
      }

      if (user.password !== action.payload?.password) {
        return {
          ...state,
          username: null,
          token: null,
          error: 'Senha incorreta. Tente novamente',
        };
      }

      const fakeToken = `token_${new Date().getTime()}`;
      localStorage.setItem('token', fakeToken);
      return {
        ...state,
        username: user.username,
        token: fakeToken,
        error: null,
      };

    case LOGOUT:
      localStorage.removeItem('token');
      return initialState;

    case SALVAR_TOKEN:
      localStorage.setItem('token', action.payload?.token || '');
      return {
        ...state,
        token: action.payload?.token || null,
      };

    case DELETAR_TOKEN:
      localStorage.removeItem('token');
      return initialState;

    default:
      return state;
  }
};
