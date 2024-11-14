import { LOGIN, LOGOUT, SALVAR_TOKEN, DELETAR_TOKEN } from './auth.actions';

export interface AuthState {
  username: string | null;
  token: string | null;
}

const initialState: AuthState = {
  username: null,
  token: null,
};

export const authReducer = (state = initialState, action: any): AuthState => {
  switch (action.type) {
    case LOGIN:
      const fakeToken = `token_${new Date().getTime()}`;
      localStorage.setItem('token', fakeToken);
      localStorage.setItem('password', action.payload.password);
      return {
        ...state,
        username: action.payload.username,
        token: fakeToken,
      };
    case LOGOUT:
      localStorage.removeItem('token');
      localStorage.removeItem('password');
      return initialState;
    case SALVAR_TOKEN:
      localStorage.setItem('token', action.payload.token);
      return {
        ...state,
        token: action.payload.token,
      };
    case DELETAR_TOKEN:
      localStorage.removeItem('token');
      return initialState;
    default:
      return state;
  }
};
