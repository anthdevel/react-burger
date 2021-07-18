import {GET_ORDER_NUMBER_ERROR, GET_ORDER_NUMBER_REQUEST, GET_ORDER_NUMBER_SUCCESS} from '../actions/order';

const initialState = {
  number: null,
  isFetching: false,
  isFetched: false,
  isFailed: false,
};

export const orderReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_ORDER_NUMBER_REQUEST: {
      return {
        ...state,
        isFetching: true,
        isFetched: false,
        isFailed: false,
      };
    }
    case GET_ORDER_NUMBER_SUCCESS: {
      return {
        ...state,
        number: action.payload,
        isFetching: false,
        isFetched: true,
        isFailed: false,
      };
    }
    case GET_ORDER_NUMBER_ERROR: {
      return {
        ...state,
        isFetching: false,
        isFetched: false,
        isFailed: true,
      };
    }

    default:
      return {...state};
  }
};