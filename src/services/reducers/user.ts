import {fetchableDefault, fetchableFailed, fetchableFetched, fetchableFetching} from '../../utils';
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
import {Nullable} from '../../types/types';
import {TUser} from '../types/data';
import {TUserActions} from '../actions/user';

export type TUserState = {
  data: Nullable<TUser>
  isLoggedIn: boolean
  get: {
    isFetching: boolean
    isFetched: boolean
    isFailed: boolean
  }
  update: {
    isFetching: boolean
    isFetched: boolean
    isFailed: boolean
  }
  login: {
    isFetching: boolean
    isFetched: boolean
    isFailed: boolean
  }
  register: {
    isFetching: boolean
    isFetched: boolean
    isFailed: boolean
  }
  logout: {
    isFetching: boolean
    isFetched: boolean
    isFailed: boolean
  }
  restorePassword: {
    isFetching: boolean
    isFetched: boolean
    isFailed: boolean
  }
  resetPassword: {
    isFetching: boolean
    isFetched: boolean
    isFailed: boolean
  }
}

const initialState: TUserState = {
  data: null,
  isLoggedIn: false,
  get: {
    ...fetchableDefault,
  },
  update: {
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

export const userReducer = (state = initialState, action: TUserActions): TUserState => {
  switch (action.type) {
    case LOGIN_USER_REQUEST: {
      return {
        ...state,
        logout: {
          ...fetchableDefault,
        },
        login: {
          ...state.login,
          ...fetchableFetching,
        }
      };
    }
    case LOGIN_USER_SUCCESS: {
      return {
        ...state,
        isLoggedIn: true,
        data: action.payload,
        login: {
          ...state.login,
          ...fetchableFetched,
        },
      };
    }
    case LOGIN_USER_ERROR: {
      return {
        ...state,
        login: {
          ...state.login,
          ...fetchableFailed,
        },
      };
    }

    case GET_USER_REQUEST: {
      return {
        ...state,
        get: {
          ...state.get,
          ...fetchableFetching,
        }
      };
    }
    case GET_USER_SUCCESS: {
      return {
        ...state,
        data: action.payload,
        get: {
          ...state.get,
          ...fetchableFetched,
        },
      };
    }
    case GET_USER_ERROR: {
      return {
        ...state,
        get: {
          ...state.get,
          ...fetchableFailed,
        },
      };
    }

    case UPDATE_USER_REQUEST: {
      return {
        ...state,
        update: {
          ...state.update,
          ...fetchableFetching,
        }
      };
    }
    case UPDATE_USER_SUCCESS: {
      return {
        ...state,
        data: action.payload,
        update: {
          ...state.update,
          ...fetchableFetched,
        },
      };
    }
    case UPDATE_USER_ERROR: {
      return {
        ...state,
        update: {
          ...state.update,
          ...fetchableFailed,
        },
      };
    }

    case LOGOUT_USER_REQUEST: {
      return {
        ...state,
        logout: {
          ...state.logout,
          ...fetchableFetching,
        }
      };
    }
    case LOGOUT_USER_SUCCESS: {
      return {
        ...initialState,
        logout: {
          ...initialState.logout,
          ...fetchableFetched,
        },
      };
    }
    case LOGOUT_USER_ERROR: {
      return {
        ...state,
        logout: {
          ...state.logout,
          ...fetchableFailed,
        },
      };
    }

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
        isLoggedIn: true,
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

    case RESET_PASSWORD_REQUEST: {
      return {
        ...state,
        resetPassword: {
          ...state.resetPassword,
          ...fetchableFetching,
        }
      };
    }
    case RESET_PASSWORD_SUCCESS: {
      return {
        ...state,
        resetPassword: {
          ...state.resetPassword,
          ...fetchableFetched,
        }
      };
    }
    case RESET_PASSWORD_ERROR: {
      return {
        ...state,
        resetPassword: {
          ...state.resetPassword,
          ...fetchableFailed,
        }
      };
    }

    default:
      return state;
  }
};