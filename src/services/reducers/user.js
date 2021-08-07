import {
  FORGOT_PASSWORD_ERROR,
  FORGOT_PASSWORD_REQUEST,
  FORGOT_PASSWORD_SUCCESS,
  REGISTER_USER_ERROR,
  REGISTER_USER_REQUEST,
  REGISTER_USER_SUCCESS
} from '../actions/user';

// TODO: Еще подумать
const initialState = {
  data: null,

  isLoggedIn: false,
  isEmailSent: false,

  isFetching: false,
  isFetched: false,
  isFailed: false,

  isForgotPasswordFetching: false,
  isForgotPasswordFetched: false,
  isForgotPasswordFailed: false,
};

export const userReducer = (state = initialState, action) => {
  switch (action.type) {
    case REGISTER_USER_REQUEST: {
      return {
        ...state,
        isFetching: true,
        isFetched: false,
        isFailed: false,
      };
    }
    case REGISTER_USER_SUCCESS: {
      return {
        ...state,
        data: action.payload,
        isLoggedIn: true,
        isFetching: false,
        isFetched: true,
        isFailed: false,
      };
    }
    case REGISTER_USER_ERROR: {
      return {
        ...state,
        isFetching: false,
        isFetched: false,
        isFailed: true,
      };
    }

    case FORGOT_PASSWORD_REQUEST: {
      return {
        ...state,
        isForgotPasswordFetching: true,
        isForgotPasswordFetched: false,
        isForgotPasswordFailed: false,
      };
    }
    case FORGOT_PASSWORD_SUCCESS: {
      return {
        ...state,
        isEmailSent: true,
        isForgotPasswordFetching: false,
        isForgotPasswordFetched: true,
        isForgotPasswordFailed: false,
      };
    }
    case FORGOT_PASSWORD_ERROR: {
      return {
        ...state,
        isForgotPasswordFetching: false,
        isForgotPasswordFetched: false,
        isForgotPasswordFailed: true,
      };
    }

    default:
      return state;
  }
};