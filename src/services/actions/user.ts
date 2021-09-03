import {deleteCookie, getCookie, setCookie} from '../../utils';
import {
  getUser,
  loginUser,
  logoutUser,
  registerUser,
  resetPassword,
  restorePassword,
  TLoginUserForm,
  TResetPasswordForm,
  TUserForm,
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
  readonly payload: TUser
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
  | IUpdateUserErrorAction;

export const getUserRequestAction = (): IGetUserRequestAction => ({
  type: GET_USER_REQUEST
})

export const getUserSuccessAction = (user: TUser): IGetUserSuccessAction => ({
  type: GET_USER_SUCCESS,
  payload: user
})

export const getUserErrorAction = (): IGetUserErrorAction => ({
  type: GET_USER_ERROR
})

export const loginUserRequestAction = (): ILoginUserRequestAction => ({
  type: LOGIN_USER_REQUEST
})

export const loginUserSuccessAction = (user: TUser): ILoginUserSuccessAction => ({
  type: LOGIN_USER_SUCCESS,
  payload: user
})

export const loginUserErrorAction = (): ILoginUserErrorAction => ({
  type: LOGIN_USER_ERROR
})

export const logoutUserRequestAction = (): ILogoutUserRequestAction => ({
  type: LOGOUT_USER_REQUEST
})

export const logoutUserSuccessAction = (): ILogoutUserSuccessAction => ({
  type: LOGOUT_USER_SUCCESS
})

export const logoutUserErrorAction = (): ILogoutUserErrorAction => ({
  type: LOGOUT_USER_ERROR
})

export const registerUserRequestAction = (): IRegisterUserRequestAction => ({
  type: REGISTER_USER_REQUEST
})

export const registerUserSuccessAction = (user: TUser): IRegisterUserSuccessAction => ({
  type: REGISTER_USER_SUCCESS,
  payload: user
})

export const registerUserErrorAction = (): IRegisterUserErrorAction => ({
  type: REGISTER_USER_ERROR
})

export const resetPasswordRequestAction = (): IResetPasswordRequestAction => ({
  type: RESET_PASSWORD_REQUEST
})

export const resetPasswordSuccessAction = (): IResetPasswordSuccessAction => ({
  type: RESET_PASSWORD_SUCCESS
})

export const resetPasswordErrorAction = (): IResetPasswordErrorAction => ({
  type: RESET_PASSWORD_ERROR
})

export const restorePasswordRequestAction = (): IRestorePasswordRequestAction => ({
  type: RESTORE_PASSWORD_REQUEST
})

export const restorePasswordSuccessAction = (): IRestorePasswordSuccessAction => ({
  type: RESTORE_PASSWORD_SUCCESS
})

export const restorePasswordErrorAction = (): IRestorePasswordErrorAction => ({
  type: RESTORE_PASSWORD_ERROR
})

export const updateUserRequestAction = (): IUpdateUserRequestAction => ({
  type: UPDATE_USER_REQUEST
})

export const updateUserSuccessAction = (user: TUser): IUpdateUserSuccessAction => ({
  type: UPDATE_USER_SUCCESS,
  payload: user
})

export const updateUserErrorAction = (): IUpdateUserErrorAction => ({
  type: UPDATE_USER_ERROR
})

export const getUserFetch = () => (dispatch: any) => {
  dispatch(getUserRequestAction());

  getUser()
    .then(response => response.json())
    .then(response => {
      if (response.success) {
        dispatch(getUserSuccessAction(response.user));

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
                  dispatch(getUserSuccessAction(response.user));

                  return response;
                }
              });
          }

          return response;
        });
    })
    .catch(error => {
      dispatch(getUserErrorAction());

      console.error(error);
    });
};

export const loginUserFetch = (form: TLoginUserForm) => (dispatch: any) => {
  dispatch(loginUserRequestAction());

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

      dispatch(loginUserSuccessAction(user));
    })
    .catch(error => {
      dispatch(loginUserErrorAction());

      console.error(error);
    });
};

export const logoutUserFetch = (token?: string) => (dispatch: any) => {
  dispatch(logoutUserRequestAction());

  logoutUser(token)
    .then(response => {
      if (response.ok) {
        deleteCookie(ETokenVariant.AccessToken);
        deleteCookie(ETokenVariant.RefreshToken);
        dispatch(logoutUserSuccessAction());

        return response;
      }

      return Promise.reject(`Ошибка ${response.status}`);
    })
    .catch(error => {
      dispatch(logoutUserErrorAction());

      console.error(error);
    });
};

export const registerUserFetch = (form: TUserForm) => (dispatch: any) => {
  dispatch(registerUserRequestAction());

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

      dispatch(registerUserSuccessAction(user));
    })
    .catch(error => {
      dispatch(registerUserErrorAction());

      console.error(error);
    });
};

export const resetPasswordFetch = (form: TResetPasswordForm) => (dispatch: any) => {
  dispatch(resetPasswordRequestAction());

  resetPassword(form)
    .then(response => {
      if (response.ok) {
        dispatch(resetPasswordSuccessAction());

        return response;
      }

      return Promise.reject(`Ошибка ${response.status}`);
    })
    .catch(error => {
      dispatch(resetPasswordErrorAction());

      console.error(error);
    });
};

export const restorePasswordFetch = (email: string) => (dispatch: any) => {
  dispatch(restorePasswordRequestAction());

  restorePassword(email)
    .then(response => {
      if (response.ok) {
        dispatch(restorePasswordSuccessAction());

        return response;
      }

      return Promise.reject(`Ошибка ${response.status}`);
    })
    .catch(error => {
      dispatch(restorePasswordErrorAction());

      console.error(error);
    });
};

export const updateUserFetch = (form: TUserForm) => (dispatch: any) => {
  dispatch(updateUserRequestAction());

  updateUser(form)
    .then(response => response.json())
    .then(response => {
      if (response.success) {
        dispatch(updateUserSuccessAction(response.user));

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
                  dispatch(updateUserSuccessAction(response.user));

                  return response;
                }
              });
          }

          return response;
        });
    })
    .catch(error => {
      dispatch(updateUserErrorAction());

      console.error(error);
    });
};