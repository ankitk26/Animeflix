import { useLazyQuery } from "@apollo/client";
import { createContext, useContext, useReducer } from "react";
import { USER_INFO } from "../graphql/queries";

const LOAD_USER = "LOAD_USER";
const LOGOUT_USER = "LOGOUT_USER";
const AUTH_SUCCESS = "AUTH_SUCCESS";

const AuthContext = createContext();

const initialState = {
  user: null,
  authLoading: true,
};

const authReducer = (state, action) => {
  const { type, payload } = action;
  switch (type) {
    case LOAD_USER:
      return { ...state, user: payload.user, authLoading: false };
    case LOGOUT_USER:
      return { ...state, user: null, authLoading: true };
    case AUTH_SUCCESS:
      return { ...state, user: payload, authLoading: false };
    default:
      return state;
  }
};

export const AuthProvider = ({ children }) => {
  const [state, dispatch] = useReducer(authReducer, initialState);

  const [loadUser, { loading, data }] = useLazyQuery(USER_INFO, {
    onCompleted: () => {
      console.log(data);
      dispatch({ type: LOAD_USER, payload: { user: data.me, loading } });
    },
  });

  const logout = () => {
    dispatch({ type: LOGOUT_USER });
  };

  const authSuccess = (user) => {
    dispatch({ type: AUTH_SUCCESS, payload: user });
  };

  return (
    <AuthContext.Provider
      value={{
        user: state.user,
        authLoading: state.authLoading,
        dispatch,
        loadUser,
        logout,
        authSuccess,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
