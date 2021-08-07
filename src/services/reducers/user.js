import {REGISTER_USER_ERROR, REGISTER_USER_REQUEST, REGISTER_USER_SUCCESS} from '../actions/user';

const initialState = {
  data: null,
  isLoggedIn: false,
  isFetching: false,
  isFetched: false,
  isFailed: false,
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

    default:
      return state;
  }
};