import {deleteCookie, getCookie, setCookie} from '../../utils';
import {
  getUser,
  loginUser,
  logoutUser,
  registerUser,
  resetPassword,
  restorePassword,
  updateToken,
  updateUser
} from '../api';
import {ETokenVariant} from '../../types/enums';
import {
  GET_USER_ERROR,
  GET_USER_REQUEST,
  GET_USER_SUCCESS,
  LOGIN_USER_ERROR,
  LOGIN_USER_REQUEST,
  LOGIN_USER_SUCCESS,
  LOGOUT_USER_ERROR,
  LOGOUT_USER_REQUEST,
  LOGOUT_USER_SUCCESS,
  REGISTER_USER_ERROR,
  REGISTER_USER_REQUEST,
  REGISTER_USER_SUCCESS,
  RESET_PASSWORD_ERROR,
  RESET_PASSWORD_REQUEST,
  RESET_PASSWORD_SUCCESS,
  RESTORE_PASSWORD_ERROR,
  RESTORE_PASSWORD_REQUEST,
  RESTORE_PASSWORD_SUCCESS,
  UPDATE_USER_ERROR,
  UPDATE_USER_REQUEST,
  UPDATE_USER_SUCCESS
} from '../constants/user';
import {TUser} from '../types/data';

export interface IGetUserRequestAction {
  readonly type: typeof GET_USER_REQUEST
}

export interface IGetUserSuccessAction {
  readonly type: typeof GET_USER_SUCCESS
  readonly payload: TUser
}

export interface IGetUserErrorAction {
  readonly type: typeof GET_USER_ERROR
}

export interface ILoginUserRequestAction {
  readonly type: typeof LOGIN_USER_REQUEST
}

export interface ILoginUserSuccessAction {
  readonly type: typeof LOGIN_USER_SUCCESS
  readonly payload: TUser
}

export interface ILoginUserErrorAction {
  readonly type: typeof LOGIN_USER_ERROR
}

export interface ILogoutUserRequestAction {
  readonly type: typeof LOGOUT_USER_REQUEST
}

export interface ILogoutUserSuccessAction {
  readonly type: typeof LOGOUT_USER_SUCCESS
}

export interface ILogoutUserErrorAction {
  readonly type: typeof LOGOUT_USER_ERROR
}

export interface IRegisterUserRequestAction {
  readonly type: typeof REGISTER_USER_REQUEST
}

export interface IRegisterUserSuccessAction {
  readonly type: typeof REGISTER_USER_SUCCESS
  readonly payload: TUser
}

export interface IRegisterUserErrorAction {
  readonly type: typeof REGISTER_USER_ERROR
}

export interface IResetPasswordRequestAction {
  readonly type: typeof RESET_PASSWORD_REQUEST
}

export interface IResetPasswordSuccessAction {
  readonly type: typeof RESET_PASSWORD_SUCCESS
}

export interface IResetPasswordErrorAction {
  readonly type: typeof RESET_PASSWORD_ERROR
}

export interface IRestorePasswordRequestAction {
  readonly type: typeof RESTORE_PASSWORD_REQUEST
}

export interface IRestorePasswordSuccessAction {
  readonly type: typeof RESTORE_PASSWORD_SUCCESS
}

export interface IRestorePasswordErrorAction {
  readonly type: typeof RESTORE_PASSWORD_ERROR
}

export interface IUpdateUserRequestAction {
  readonly type: typeof UPDATE_USER_REQUEST
}

export interface IUpdateUserSuccessAction {
  readonly type: typeof UPDATE_USER_SUCCESS
}

export interface IUpdateUserErrorAction {
  readonly type: typeof UPDATE_USER_ERROR
}

export type TUserActions =
  | IGetUserRequestAction
  | IGetUserSuccessAction
  | IGetUserErrorAction
  | ILoginUserRequestAction
  | ILoginUserSuccessAction
  | ILoginUserErrorAction
  | ILogoutUserRequestAction
  | ILogoutUserSuccessAction
  | ILogoutUserErrorAction
  | IRegisterUserRequestAction
  | IRegisterUserSuccessAction
  | IRegisterUserErrorAction
  | IResetPasswordRequestAction
  | IResetPasswordSuccessAction
  | IResetPasswordErrorAction
  | IRestorePasswordRequestAction
  | IRestorePasswordSuccessAction
  | IRestorePasswordErrorAction
  | IUpdateUserRequestAction
  | IUpdateUserSuccessAction
  | IUpdateUserErrorAction

export const getUserFetch = () => (dispatch: any) => {
  dispatch({type: GET_USER_REQUEST});

  getUser()
    .then(response => response.json())
    .then(response => {
      if (response.success) {
        dispatch({
          type: GET_USER_SUCCESS,
          payload: response.user
        });

        return response;
      }

      return updateToken(getCookie(ETokenVariant.RefreshToken))
        .then(response => response.json())
        .then(response => {
          if (response.success) {
            setCookie(ETokenVariant.AccessToken, response.accessToken.split('Bearer ')[1]);
            setCookie(ETokenVariant.RefreshToken, response.refreshToken);

            return getUser()
              .then(response => response.json())
              .then(response => {
                if (response.success) {
                  dispatch({
                    type: GET_USER_SUCCESS,
                    payload: response.user
                  });

                  return response;
                }
              });
          }

          return response;
        });
    })
    .catch(error => {
      dispatch({type: GET_USER_ERROR});

      console.error(error);
    });
};

export const loginUserFetch = (form: any) => (dispatch: any) => {
  dispatch({type: LOGIN_USER_REQUEST});

  loginUser(form)
    .then(response => {
      if (response.ok) {
        return response.json();
      }

      return Promise.reject(`Ошибка ${response.status}`);
    })
    .then(({accessToken, refreshToken, user}) => {
      if (accessToken) {
        setCookie(ETokenVariant.AccessToken, accessToken.split('Bearer ')[1]);
      }

      if (refreshToken) {
        setCookie(ETokenVariant.RefreshToken, refreshToken);
      }

      dispatch({
        type: LOGIN_USER_SUCCESS,
        payload: user
      });
    })
    .catch(error => {
      dispatch({type: LOGIN_USER_ERROR});

      console.error(error);
    });
};

export const logoutUserFetch = (token: any) => (dispatch: any) => {
  dispatch({type: LOGOUT_USER_REQUEST});

  logoutUser(token)
    .then(response => {
      if (response.ok) {
        deleteCookie(ETokenVariant.AccessToken);
        deleteCookie(ETokenVariant.RefreshToken);
        dispatch({type: LOGOUT_USER_SUCCESS});

        return response;
      }

      return Promise.reject(`Ошибка ${response.status}`);
    })
    .catch(error => {
      dispatch({type: LOGOUT_USER_ERROR});

      console.error(error);
    });
};

export const registerUserFetch = (form: any) => (dispatch: any) => {
  dispatch({
    type: REGISTER_USER_REQUEST
  });

  registerUser(form)
    .then(response => {
      if (response.ok) {
        return response.json();
      }

      return Promise.reject(`Ошибка ${response.status}`);
    })
    .then(({accessToken, refreshToken, user}) => {
      if (accessToken) {
        setCookie(ETokenVariant.AccessToken, accessToken.split('Bearer ')[1]);
      }

      if (refreshToken) {
        setCookie(ETokenVariant.RefreshToken, refreshToken);
      }

      dispatch({
        type: REGISTER_USER_SUCCESS,
        payload: user
      });
    })
    .catch(error => {
      dispatch({
        type: REGISTER_USER_ERROR
      });

      console.error(error);
    });
};

export const resetPasswordFetch = (form: any) => (dispatch: any) => {
  dispatch({type: RESET_PASSWORD_REQUEST});

  resetPassword(form)
    .then(response => {
      if (response.ok) {
        dispatch({type: RESET_PASSWORD_SUCCESS});

        return response;
      }

      return Promise.reject(`Ошибка ${response.status}`);
    })
    .catch(error => {
      dispatch({type: RESET_PASSWORD_ERROR});

      console.error(error);
    });
};

export const restorePasswordFetch = (email: any) => (dispatch: any) => {
  dispatch({type: RESTORE_PASSWORD_REQUEST});

  restorePassword(email)
    .then(response => {
      if (response.ok) {
        dispatch({type: RESTORE_PASSWORD_SUCCESS});

        return response;
      }

      return Promise.reject(`Ошибка ${response.status}`);
    })
    .catch(error => {
      dispatch({type: RESTORE_PASSWORD_ERROR});

      console.error(error);
    });
};

export const updateUserFetch = (form: any) => (dispatch: any) => {
  dispatch({type: UPDATE_USER_REQUEST});

  updateUser(form)
    .then(response => response.json())
    .then(response => {
      if (response.success) {
        dispatch({
          type: GET_USER_SUCCESS,
          payload: response.user
        });

        return response;
      }

      return updateToken(getCookie(ETokenVariant.RefreshToken))
        .then(response => response.json())
        .then(response => {
          if (response.success) {
            setCookie(ETokenVariant.AccessToken, response.accessToken.split('Bearer ')[1]);
            setCookie(ETokenVariant.RefreshToken, response.refreshToken);

            return getUser()
              .then(response => response.json())
              .then(response => {
                if (response.success) {
                  dispatch({
                    type: UPDATE_USER_SUCCESS,
                    payload: response.user
                  });

                  return response;
                }
              });
          }

          return response;
        });
    })
    .catch(error => {
      dispatch({type: UPDATE_USER_ERROR});

      console.error(error);
    });
};