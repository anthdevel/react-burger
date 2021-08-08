import {
  FORGOT_PASSWORD_ERROR,
  FORGOT_PASSWORD_REQUEST,
  FORGOT_PASSWORD_SUCCESS,
  REGISTER_USER_ERROR,
  REGISTER_USER_REQUEST,
  REGISTER_USER_SUCCESS
} from '../actions/user';

const user = {
  data: null,
  get: {
    isFetching: false,
    isFetched: false,
    isFailed: false,
  },
  save: {
    isFetching: false,
    isFetched: false,
    isFailed: false,
  },
  login: {
    isFetching: false,
    isFetched: false,
    isFailed: false,
  },
  register: {
    isFetching: false,
    isFetched: false,
    isFailed: false,
  },
  logout: {
    isFetching: false,
    isFetched: false,
    isFailed: false,
  },
  forgotPassword: {
    isFetching: false,
    isFetched: false,
    isFailed: false,
  },
  resetPassword: {
    isFetching: false,
    isFetched: false,
    isFailed: false,
  },
}

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