import {
  REGISTER_USER_ERROR,
  REGISTER_USER_REQUEST,
  REGISTER_USER_SUCCESS, RESTORE_PASSWORD_ERROR, RESTORE_PASSWORD_REQUEST, RESTORE_PASSWORD_SUCCESS
} from '../actions/user';
import {fetchableDefault, fetchableFailed, fetchableFetched, fetchableFetching} from '../../utils';

const initialState = {
  data: null,
  get: {
    ...fetchableDefault,
  },
  save: {
    ...fetchableDefault,
  },
  login: {
    ...fetchableDefault,
  },
  register: {
    ...fetchableDefault,
  },
  logout: {
    ...fetchableDefault,
  },
  restorePassword: {
    ...fetchableDefault,
  },
  resetPassword: {
    ...fetchableDefault,
  },
};

export const userReducer = (state = initialState, action) => {
  switch (action.type) {
    case REGISTER_USER_REQUEST: {
      return {
        ...state,
        register: {
          ...state.register,
          ...fetchableFetching,
        }
      };
    }
    case REGISTER_USER_SUCCESS: {
      return {
        ...state,
        data: action.payload,
        register: {
          ...state.register,
          ...fetchableFetched,
        },
      };
    }
    case REGISTER_USER_ERROR: {
      return {
        ...state,
        register: {
          ...state.register,
          ...fetchableFailed,
        },
      };
    }

    case RESTORE_PASSWORD_REQUEST: {
      return {
        ...state,
        restorePassword: {
          ...state.restorePassword,
          ...fetchableFetching,
        }
      };
    }
    case RESTORE_PASSWORD_SUCCESS: {
      return {
        ...state,
        restorePassword: {
          ...state.restorePassword,
          ...fetchableFetched,
        }
      };
    }
    case RESTORE_PASSWORD_ERROR: {
      return {
        ...state,
        restorePassword: {
          ...state.restorePassword,
          ...fetchableFailed,
        }
      };
    }

    default:
      return state;
  }
};